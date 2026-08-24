# Shared Validation Commands

Run only the smallest relevant set; do not repeat expensive checks.

## Types & lint

```bash
pnpm check-types
pnpm lint
```

`check-types` runs `next typegen && tsc --noEmit` for the web app (plus typecheck for other workspaces). `lint` runs ESLint with `--max-warnings 0` — no warnings may be committed.

## Tests

```bash
pnpm test
```

Runs Vitest in `apps/web` (`lib/**/*.test.ts`) and Jest in `apps/api`.

## Locale dictionaries (when `database/locales/*.json` changed)

```bash
pnpm generate:locales
```

Only backfills missing keys in the 6 non-English dictionaries from `en.json`; see `locale-dictionary-audit` for what this does and does not catch.

## Build (only when a rendered-output check is required)

```bash
pnpm build
```

Runs the full Turborepo build pipeline for every app/package.

## Full gate (rare)

```bash
pnpm check-types && pnpm lint && pnpm test && pnpm build
```

This mirrors what CI (`.github/workflows/ci.yml`) runs. Report blockers clearly; do not silently retry.
