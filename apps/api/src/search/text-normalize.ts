const COMBINING_DIACRITICAL_MARKS = /[̀-ͯ]/g;

export function stripDiacritics(value: string): string {
  return value
    .normalize('NFD')
    .replace(COMBINING_DIACRITICAL_MARKS, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function normalizeSearchText(value: string): string {
  return stripDiacritics(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

export function tokenize(value: string): string[] {
  const normalized = normalizeSearchText(value);
  return normalized.length ? normalized.split(' ') : [];
}
