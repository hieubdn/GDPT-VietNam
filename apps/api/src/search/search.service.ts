import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeSearchText, tokenize } from './text-normalize';
import {
  LOCALE_FILE_NAMES,
  SearchEntry,
  SearchResult,
  SiteLocale,
} from './search.types';

const WHOLE_WORD_MATCH_SCORE = 30;
const PREFIX_MATCH_SCORE = 20;
const SUBSTRING_MATCH_SCORE = 10;
const ALL_TOKENS_MATCHED_BONUS = 50;
const PHRASE_MATCH_BONUS = 40;
const LABEL_FIELD_WEIGHT = 1;
const KEY_FIELD_WEIGHT = 0.5;
export const MAX_SEARCH_RESULTS = 8;

interface FieldMatch {
  score: number;
  matchedTokenCount: number;
}

function scoreField(
  tokens: string[],
  normalizedFieldText: string,
  weight: number,
): FieldMatch {
  const fieldWords = normalizedFieldText.split(' ');
  let score = 0;
  let matchedTokenCount = 0;

  for (const token of tokens) {
    if (fieldWords.includes(token)) {
      score += WHOLE_WORD_MATCH_SCORE;
      matchedTokenCount += 1;
    } else if (fieldWords.some((word) => word.startsWith(token))) {
      score += PREFIX_MATCH_SCORE;
      matchedTokenCount += 1;
    } else if (normalizedFieldText.includes(token)) {
      score += SUBSTRING_MATCH_SCORE;
      matchedTokenCount += 1;
    }
  }

  return { score: score * weight, matchedTokenCount };
}

function flattenLocale(node: unknown, prefix: string[] = []): SearchEntry[] {
  if (typeof node === 'string') {
    return [{ key: prefix.join('.'), label: node }];
  }

  if (node && typeof node === 'object') {
    return Object.entries(node as Record<string, unknown>).flatMap(
      ([childKey, childValue]) =>
        flattenLocale(childValue, [...prefix, childKey]),
    );
  }

  return [];
}

@Injectable()
export class SearchService {
  resolveLocale(rawLang: string | undefined): SiteLocale {
    return rawLang?.toLowerCase().startsWith('vi') ? 'vie' : 'eng';
  }

  search(query: string, locale: SiteLocale): SearchResult[] {
    const tokens = tokenize(query);
    if (tokens.length === 0) {
      return [];
    }

    const normalizedQuery = normalizeSearchText(query);
    const entries = this.loadLocaleEntries(locale);
    const results: SearchResult[] = [];

    for (const entry of entries) {
      const normalizedLabel = normalizeSearchText(entry.label);
      const normalizedKeyWords = normalizeSearchText(
        entry.key.replace(/[-.]/g, ' '),
      );

      const labelMatch = scoreField(
        tokens,
        normalizedLabel,
        LABEL_FIELD_WEIGHT,
      );
      const keyMatch = scoreField(tokens, normalizedKeyWords, KEY_FIELD_WEIGHT);
      const matchedTokenCount = Math.max(
        labelMatch.matchedTokenCount,
        keyMatch.matchedTokenCount,
      );

      if (matchedTokenCount === 0) {
        continue;
      }

      let score = labelMatch.score + keyMatch.score;
      if (matchedTokenCount === tokens.length) {
        score += ALL_TOKENS_MATCHED_BONUS;
      }
      if (normalizedLabel.includes(normalizedQuery)) {
        score += PHRASE_MATCH_BONUS;
      }

      results.push({ ...entry, score, matchedTokenCount });
    }

    return results
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.matchedTokenCount - a.matchedTokenCount ||
          a.label.length - b.label.length,
      )
      .slice(0, MAX_SEARCH_RESULTS);
  }

  private loadLocaleEntries(locale: SiteLocale): SearchEntry[] {
    const filePath = join(this.resolveLocalesDir(), LOCALE_FILE_NAMES[locale]);
    const raw = readFileSync(filePath, 'utf-8');
    return flattenLocale(JSON.parse(raw));
  }

  private resolveLocalesDir(): string {
    const candidates = [
      join(process.cwd(), '..', '..', 'database', 'locales'),
      join(process.cwd(), 'database', 'locales'),
    ];
    const found = candidates.find((dir) => existsSync(dir));

    if (!found) {
      throw new InternalServerErrorException(
        'Locale data directory could not be located',
      );
    }

    return found;
  }
}
