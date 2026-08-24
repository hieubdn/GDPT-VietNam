---
name: locale-dictionary-audit
description: Audit hieubdn's `database/locales/*.json` dictionaries for missing keys, orphaned keys, and stale translations against the `en.json` source, and run `pnpm generate:locales` to backfill.
---

# Locale Dictionary Audit

The site's i18n system is JSON key/value dictionaries, not per-market pages or routes. There is no `/vn/`, `/jp/`, etc. — locale switching is client-side, backed by a `profile-locale` cookie + `localStorage`, resolved via `LocaleProvider` (`apps/web/components/layout/setting/translate/`). `en.json` is the canonical source; the other 6 locale files (`vi`, `ja`, `zh-CN`, `ko`, `de`, `fr`) are derived from it.

Use for:
- Checking all locale files stay in sync with `en.json` after content changes.
- Finding orphaned keys (present in a locale file but removed from `en.json`).
- Finding keys never run through translation (missing in one or more locale files).
- Flagging likely-stale translations (source text changed but the translated value wasn't regenerated).

Don't use for:
- Judging translation quality/nuance — `pnpm generate:locales` calls a machine-translation API (MyMemory); quality review is a separate, explicit ask.
- Any per-page or per-route localization — this repo has none.

## How the pipeline works (`scripts/generate-locales.ts`)

- Reads `database/locales/en.json` as source of truth.
- For each target locale, computes `missingKeys = keys in en.json not present in that locale's JSON`.
- Translates only the missing keys via MyMemory and writes them back — **it never re-translates a key that already exists**, even if the English source text changed since.
- It never removes keys that exist in a locale file but were deleted from `en.json`.

This means two failure modes `generate:locales` cannot catch on its own:
1. **Orphaned keys** — deleted from `en.json`, still present (and unused) in other locale files.
2. **Stale translations** — the English value changed, but the translated value is still the old wording because the key already existed.

## Workflow

1. **Load all 7 files**: `database/locales/{en,vi,ja,zh-CN,ko,de,fr}.json`.
2. **Key-set diff** against `en.json` for each of the other 6:
   - Missing (in `en.json`, absent here) → needs `pnpm generate:locales`.
   - Orphaned (present here, absent in `en.json`) → candidate for manual removal; confirm the key is truly unused (`grep` for the key string in `apps/web/`) before deleting.
3. **Stale-translation heuristic** (best-effort, since there's no timestamp): flag keys whose English value in `en.json` doesn't match the git history/last-known value if available, or where the translated string looks untouched/identical to a placeholder. When unsure, ask the user which keys changed recently instead of guessing.
4. **Usage check**: for a specific key or feature, `grep` `apps/web/` for the key string to confirm it's still referenced via `t("...")` / `useLocaleText` before flagging it as orphaned or unused.
5. **Report gaps**, then offer to run `pnpm generate:locales` to backfill missing keys. Orphaned-key removal and stale-translation fixes are always manual edits — describe the change before applying it.

## Rules

- Never hand-write machine-translation output for missing keys — let `pnpm generate:locales` do that; hand-editing is only for fixing an already-generated translation the user flags as wrong.
- Never invent a key name that doesn't already exist in `en.json` without the user confirming the new copy first.
- Keep JSON valid and formatted the same way the script writes it (`JSON.stringify(result, null, 2)`), so diffs stay clean.
- If `en.json` itself has duplicate or unused keys, report them; don't silently prune without confirmation.

## Validation

```bash
pnpm generate:locales
pnpm check-types
```

## Output

```markdown
## Locale Dictionary Audit
- Source: `database/locales/en.json` (`<key count>` keys)

## Missing Keys (need `pnpm generate:locales`)
- `<locale>`: `<count>` keys — e.g. `<key>`

## Orphaned Keys (in locale file, not in en.json)
- `<locale>`: `<key>` — `<used in code? yes/no>`

## Possibly Stale Translations
- `<key>` — English changed, translation may be outdated

## Recommended Actions
1. `<action>`

## Next Step
Ask whether to run `pnpm generate:locales` and/or apply removals, unless the user already asked.
```
