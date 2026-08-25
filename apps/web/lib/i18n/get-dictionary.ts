import { cookies } from "next/headers";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isLocale, type Locale } from "./locale.constants";

const LOCALE_FILE_NAMES: Record<Locale, string> = {
  vi: "vie.json",
  en: "eng.json",
};

interface HeaderDictionary {
  home: string;
  "buddhist-studies": string;
  training: string;
  "division-activities": string;
  post: string;
}

interface PurposeSelfBenefitDictionary {
  label: string;
  title: string;
  audienceLabel: string;
  audience: string;
  goalLabel: string;
  goal: string;
}

interface PurposeOtherBenefitDictionary {
  label: string;
  title: string;
  dharmaLabel: string;
  dharma: string;
  societyLabel: string;
  society: string;
}

interface PurposeDictionary {
  title: string;
  quote: string;
  intro: string;
  selfBenefit: PurposeSelfBenefitDictionary;
  otherBenefit: PurposeOtherBenefitDictionary;
}

interface MottoVirtueDictionary {
  name: string;
  fullName: string;
  definitionLabel: string;
  definition: string;
  meaningLabel: string;
  meaning: string;
}

interface MottoRelationshipDictionary {
  title: string;
  intro: string;
  points: string[];
}

interface MottoDictionary {
  title: string;
  emblemAlt: string;
  origin: string;
  compassion: MottoVirtueDictionary;
  wisdom: MottoVirtueDictionary;
  courage: MottoVirtueDictionary;
  relationship: MottoRelationshipDictionary;
}

export interface Dictionary {
  header: HeaderDictionary;
  purpose: PurposeDictionary;
  motto: MottoDictionary;
}

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale): Dictionary {
  const filePath = join(resolveLocalesDir(), LOCALE_FILE_NAMES[locale]);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Dictionary;
}

function resolveLocalesDir(): string {
  const candidates = [
    join(process.cwd(), "..", "..", "database", "locales"),
    join(process.cwd(), "database", "locales"),
  ];
  const found = candidates.find((dir) => existsSync(dir));

  if (!found) {
    throw new Error("Locale data directory could not be located");
  }

  return found;
}
