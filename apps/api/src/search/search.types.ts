export type SiteLocale = 'vie' | 'eng';

export const LOCALE_FILE_NAMES: Record<SiteLocale, string> = {
  vie: 'vie.json',
  eng: 'eng.json',
};

export interface SearchEntry {
  key: string;
  label: string;
}

export interface SearchResult extends SearchEntry {
  score: number;
  matchedTokenCount: number;
}

export interface SearchResponse {
  results: SearchResult[];
}
