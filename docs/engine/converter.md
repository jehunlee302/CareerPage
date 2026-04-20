# Converter Architecture

## scripts/yaml-to-json.js

Reads `data/career/*.yaml` → writes `data/portfolio.json`.

### Usage
```bash
node scripts/yaml-to-json.js            # English (default)
node scripts/yaml-to-json.js --lang ko  # Korean
```

### How It Works

1. **Load** — Reads each YAML file via `js-yaml`
2. **Merge** — Multi-file sections (projects-*.yaml, publications-*.yaml) are merged and sorted by index desc
3. **Extract** — Bilingual fields `{ en, ko }` → single-language value based on `--lang`
4. **Transform** — YAML snake_case keys → JSON camelCase (e.g., `is_pm` → `isPM`, `full_citation` → `fullCitation`)
5. **Write** — Outputs `data/portfolio.json` with `JSON.stringify(data, null, 2)`

### Key Functions

| Function | Input | Output |
|----------|-------|--------|
| `load(filename)` | YAML filename | Parsed object |
| `loadMerged(prefix)` | File prefix (e.g., `'projects-'`) | Merged + sorted array |
| `extractLang(obj)` | Any value (bilingual or plain) | Single-language value |
| `buildBasic(raw)` | basic.yaml data | `{ name, nameKr, titles, email, ... }` |
| `buildEducation(raw)` | education.yaml array | Education items with thesis |
| `buildWork(raw)` | work.yaml array | Work items with responsibilities |
| `buildProjects(raw)` | Merged projects array | Projects with details |
| `buildPublications(raw)` | Merged publications array | Publications |

### Bilingual Extraction Logic

```
Input: { en: "Hello", ko: "안녕" }  →  "Hello" (lang=en)
Input: "plain string"               →  "plain string"
Input: [{ en: "A", ko: "가" }]      →  ["A"] (lang=en)
Input: { nested: { en: "X" } }      →  { nested: "X" }
```

Fallback: if `ko` is empty, falls back to `en` value.

### Dependencies

- `js-yaml` (npm) — YAML parsing
- Node.js built-ins: `fs`, `path`
