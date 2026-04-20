# Data Schema

## YAML Source (data/career/)

### Bilingual Field Pattern

Translatable fields use nested `en`/`ko`:
```yaml
title:
  en: "English text"
  ko: "한국어 텍스트"
```

Non-translatable fields (dates, indices, booleans, URLs) are plain values:
```yaml
period: "2025.06 - 2025.12"
is_pm: true
index: 25
```

### File Schemas

#### basic.yaml
```yaml
name: { en, ko }
titles: [{ en, ko }]
email: [string]
website: string
location: { en, ko }
google_site: string
```

#### education.yaml
```yaml
- degree: string
  institution: { en, ko }
  period: string
  major: { en, ko }
  region: string
  advisor: string (optional)
  thesis: (optional)
    title: { en, ko }
    topic: { en, ko }
    prior_limitations: { en, ko }
    methodology: { en, ko }
    performance: { en, ko }
```

#### work.yaml
```yaml
- position: { en, ko }
  organization: string
  division: string
  period: string
  roles: { en, ko }
  responsibilities: [{ en, ko }] (optional)
  highlights: [{ en, ko }] (optional)
  advisor: string (optional)
  region: string
```

#### projects-YYYY-YYYY.yaml
```yaml
- index: integer
  period: string
  duration: string
  title: { en, ko }
  client: string
  partners: [string] (optional)
  affiliated_institution: string
  is_pm: boolean
  remarks: { en, ko }
  details: (optional)
    purpose: { en, ko }
    role: { en, ko }
    tasks: [{ en, ko }]
    achievements: { en, ko }
    notes: { en, ko }
```

#### publications-YYYY-YYYY.yaml
```yaml
- index: integer
  year: integer
  type: "Journal" | "Conference" | "Poster"
  global: boolean
  role: "1st Author" | "Co-Author"
  authors: string
  title: string
  venue: string
  full_citation: string
  link: string (optional)
  remarks: string (optional)
```

#### skills.yaml
```yaml
category_key:
  label: { en, ko }
  items: [string]
```

#### honors.yaml
```yaml
- date: string
  title: { en, ko }
  description: { en, ko }
  organization: string
  location: string
  remarks: string (optional)
```

#### patents.yaml
```yaml
- title: { en, ko }
  description: { en, ko }
  application_date: string
  application_number: string
  applicant: string
  authority: string
```

#### activities.yaml
```yaml
- role: { en, ko }
  organization: { en, ko }
  location: string
  period: string
```

#### philosophy.yaml
```yaml
headline: { en, ko }
lead: { en, ko }
body: { en, ko }
pillars:
  - icon: string
    title: { en, ko }
    desc: { en, ko }
stats:
  - value: string
    label: { en, ko }
```

---

## JSON Contract (data/portfolio.json)

### Required Top-Level Keys
```json
{
  "lastUpdated": "YYYY-MM-DD",
  "basic": {},
  "philosophy": {},
  "stats": [],
  "education": [],
  "workExperience": [],
  "projects": [],
  "publications": [],
  "skills": {},
  "honors": [],
  "patents": [],
  "activities": []
}
```

### Rules
1. `lastUpdated` — ISO date `YYYY-MM-DD`
2. Arrays — never `null`, use `[]`
3. Objects — never `null`, use `{}`
4. All strings safe for HTML after `esc()` escaping
5. Do not remove any top-level key
6. Projects sorted by `index` descending
7. Publications sorted by `index` descending
