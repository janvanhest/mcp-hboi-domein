# HBO-i MCP Server Implementatieplan

## Aanbeveling

Start met een MCP-native TypeScript server met clean architecture.

### One-liner overzicht

- MCP-native is sneller naar MVP (2 uur vs 6-8 uur) en matcht de primaire use case perfect
- HBO-i data is klein en statisch (~400 beroepstaken max) - geen enterprise framework nodig
- MCP "resources" + "tools" pattern is exact wat je nodig hebt voor AI-consumptie
- Clean architecture maakt REST API later toevoegen eenvoudig zonder refactor
- TypeScript + MCP SDK geeft type safety en voldoet aan alle user rules (KISS, DRY, clean code)
- Lokale deployment via stdio is privacy-vriendelijk voor onderwijscontext
- NestJS voegt nu alleen boilerplate toe zonder meerwaarde voor deze schaal

---

## Gedetailleerde onderbouwing

### Waarom MCP-first?

#### Use case match

Je expliciete doel is "AI-modellen via MCP laten terugvallen op canonieke dataset". MCP is hiervoor ontworpen - het heeft:

- **Resources**: Statische data sources (perfect voor je JSON datasets)
- **Tools**: Parametrized queries (getBeroepstaak, searchCompetence, etc.)
- **Prompts**: Context injection voor consistente AI-responses

#### Data schaal

Met ~20 activiteiten, ~5 architectuurlagen, 4 niveaus, ~30 skills en ~400 beroepstaken is dit KLEINE data. NestJS met modules, controllers, services, DTOs, guards, pipes, etc. is over-engineered voor deze schaal.

#### Time-to-value

MCP server = ~150 regels clean TypeScript voor volledige functionaliteit. NestJS setup alleen al is ~500+ regels boilerplate.

#### Deployment

MCP via stdio = geen hosting, geen CORS, geen auth complexity, draait lokaal. Perfect voor onderwijsomgeving waar privacy belangrijk is.

---

## Architectuur voorstel

```
┌─────────────────────────────────────────┐
│          Data Layer (JSON)              │
│  - JSON files + validation (Ajv)        │
│  - Schema as source of truth            │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Service Layer (Business Logic)     │
│  - HboiDataService (framework-agnostic) │
│  - All queries, filters, crosswalks     │
│  - Fully testable in isolation          │
└──────────────────┬──────────────────────┘
                   │
          ┌────────┴─────────┐
          │                  │
┌─────────▼────────┐  ┌─────▼──────────────┐
│  MCP Interface   │  │  REST Interface    │
│  (nu)            │  │  (later, optioneel)│
│  - Resources     │  │  - Express/NestJS  │
│  - Tools         │  │  - OpenAPI/Swagger │
└──────────────────┘  └────────────────────┘
```

### Later uitbreiden met REST (indien nodig)

```typescript
// Later: REST wrapper (4 uur werk)
// src/rest/app.ts
import express from 'express';
import { HboiDataService } from '../services/HboiDataService';

const app = express();
const service = await HboiDataService.create();

app.get('/api/activiteiten', (req, res) => {
  res.json(service.getActiviteiten());
});

app.get('/api/beroepstaken', (req, res) => {
  const query = {
    activiteit_id: req.query.activiteit as any,
    architectuurlaag_id: req.query.laag as any,
    beheersingsniveau_id: req.query.niveau
      ? parseInt(req.query.niveau)
      : undefined,
  };
  res.json(service.filterBeroepstaken(query));
});

// ... etc. Alle routes gebruiken HboiDataService
```

De HboiDataService wordt door BEIDE gebruikt - geen duplicatie.

---

## Concrete voordelen van deze aanpak

| Aspect           | MCP-native           | NestJS-first                |
| ---------------- | -------------------- | --------------------------- |
| Time to MVP      | 2-4 uur              | 6-10 uur                    |
| Codebase size    | ~300 regels          | ~1000+ regels               |
| AI integratie    | Direct               | Adapter nodig               |
| Type safety      | ✅ TypeScript        | ✅ TypeScript               |
| Deployment       | Lokaal/stdio         | Hosting needed              |
| Testing          | Jest unit tests      | Jest + E2E                  |
| Leerervaring     | Hands-on MCP         | Bekend terrein              |
| Uitbreidbaarheid | REST later toevoegen | MCP adapter later toevoegen |

---

## Implementatie fases

### Fase 1: Foundation Setup (4-6 uur)

**Setup & Tooling:**

- TypeScript + Vite project init
- Dependencies (MCP SDK, Ajv, Jest)
- Tooling (ESLint, Prettier, build scripts)
- JSON Schema → TypeScript types generatie

**Data Layer:**

- Data loading & validation implementeren
- Runtime validation met Ajv
- In-memory caching setup

**Success criteria:**

- ✅ Project compileert zonder errors
- ✅ JSON data valideert tegen schema
- ✅ Types gegenereerd uit schema

### Fase 2: Service Layer Implementation (8-12 uur)

**Core Business Logic:**

- `HboiDataService` implementatie
- Alle query methods (15-20 methods):
  - Entity access (getActiviteiten, getBeroepstaken, etc.)
  - Hierarchical queries (getCompetenciesForAandachtsgebied)
  - Relational queries (getCompetenciesForActivity)
  - Filtering & search (filterBeroepstaken, searchByQualityConcern)
  - Alias resolution (resolveAlias)
  - Crosswalks (mapActivityToECF, mapNiveauToSFIA)
  - Progression paths (getProgressionPath)

**Testing:**

- Unit tests voor alle service methods
- > 80% test coverage
- Edge cases & error handling

**Success criteria:**

- ✅ Alle service methods geïmplementeerd
- ✅ Tests passing met >80% coverage
- ✅ Framework-agnostic (geen MCP dependencies in service)

### Fase 3: MCP Interface Layer (6-8 uur)

**MCP Server Setup:**

- MCP server configuratie
- Resources definitie (7 resources)
- Tools implementatie (8+ tools)
- Error handling & logging

**Integration:**

- Claude Desktop configuratie
- End-to-end testing
- Performance optimalisatie

**Success criteria:**

- ✅ MCP server start zonder errors
- ✅ Alle resources toegankelijk
- ✅ Alle tools werkend in Claude Desktop

### Fase 4: Documentation & Polish (2-4 uur)

**Documentation:**

- Usage guide voor cursor
- API documentation (JSDoc)
- Architecture documentation
- README updates

**Quality Assurance:**

- Manual testing in Claude
- Performance testing
- Code review & cleanup

**Success criteria:**

- ✅ Documentatie compleet
- ✅ Manual testing succesvol
- ✅ Production-ready code

**Totaal: 20-30 uur (3-4 werkdagen)**

### Fase 5: Data Completeness (parallel/later)

**Extractie uit HBO-i brondocument:**

- Volledige dataset (~100 beroepstaken)
- Alle professional skills uitwerken
- Bronverwijzingen toevoegen (pagina/paragraaf)
- Aliases verzamelen

**Niet blocking voor Fase 1-4:**

- MCP server werkt met subset (hboi.example.json)
- Uitbreiding is drop-in replacement

### Fase 6: REST API (indien nodig) – 4 uur

**Triggers:**

- Web dashboard gewenst
- Externe systeem integratie
- Non-AI consumptie
- Landelijke distributie

**Implementatie:**

- Express server
- Routes naar `HboiDataService` methods
- OpenAPI/Swagger docs
- CORS configuratie

**Effort:** ~4 uur (service laag hergebruik)

---

## De 5 verfijningspunten

Gebaseerd op analyse van het uitgebreide HBO-i schema:

### ✅ 1. Framework-agnostic core architectuur

```typescript
// src/services/HboiDataService.ts
export class HboiDataService {
  // Entity access
  getActiviteiten(): Activiteit[];
  getBeroepstaken(): Beroepstaak[];

  // Hierarchical queries
  getCompetenciesForAandachtsgebied(id: string);

  // Relational queries
  getCompetenciesForActivity(activiteitId: ActiviteitId);

  // Filtering & search
  filterBeroepstaken(query: BeroepstaakQuery): Beroepstaak[];
  searchByQualityConcern(concern: string, minNiveau?: number);

  // Crosswalks
  mapActivityToECF(activiteitId: ActiviteitId);
  mapNiveauToSFIA(niveau: BeheersingsniveauId);

  // Progression paths
  getProgressionPath(query: ProgressionPathQuery): Beroepstaak[];
}
```

### ✅ 2. Rijke query methods (hiërarchisch, relationeel, crosswalks)

Het schema heeft complexe structuren die specifieke queries vereisen:

- **Hiërarchisch**: Aandachtsgebieden → Competenties
- **Relationeel**: Activiteiten ↔ Professional Skills (via `verbanden`)
- **Crosswalks**: HBO-i ↔ eCF/SFIA/NLQF mappings
- **Filtering**: Multi-dimensionaal (activiteit × laag × niveau + kwaliteitseisen)
- **Aliases**: "frontend" → "arch.gebruikersinteractie"

### ✅ 3. Strikte TypeScript types + runtime validation

```typescript
// Compile-time safety
type ActiviteitId =
  | 'act.analyseren'
  | 'act.adviseren'
  | 'act.ontwerpen'
  | 'act.realiseren'
  | 'act.manage_control';
type KwaliteitsEis =
  | 'security'
  | 'privacy'
  | 'duurzaamheid'
  | 'performance'
  | 'toegankelijkheid';

// Runtime validation
import Ajv from 'ajv';
const validate = ajv.compile(schema);
export function validateHboiData(data: unknown): data is HboiDataset {
  /* ... */
}
```

### ✅ 4. REST-ready architectuur

Service laag is framework-agnostic → REST wrapper toevoegen = 4 uur werk zonder refactor.

### ✅ 5. JSDoc documentatie

```typescript
/**
 * Filtert beroepstaken op basis van meerdere criteria.
 * @param query - Filter criteria (activiteit, laag, niveau, kwaliteitseisen)
 * @returns Array van beroepstaken die aan alle criteria voldoen
 * @example
 * const tasks = service.filterBeroepstaken({
 *   beheersingsniveau_id: 3,
 *   kwaliteitseisen: ['security']
 * });
 */
```

---

## MCP Server specificatie

### Resources (7)

- `hboi://meta` - Dataset metadata, versioning
- `hboi://activiteiten` - Alle 5 activiteiten
- `hboi://architectuurlagen` - Alle 5 lagen
- `hboi://beheersingsniveaus` - Alle 4 niveaus met criteria
- `hboi://professional_skills` - 4 gebieden met 12 competenties
- `hboi://beroepstaken` - Alle beroepstaken
- `hboi://raamwerken` - eCF/SFIA/NLQF crosswalks

### Tools (8+)

- `getBeroepstaak(activiteit, laag, niveau)` → specifieke taak
- `searchByQuality(concern, minNiveau?)` → gefilterde lijst
- `getProgressionPath(activiteit, laag)` → niveau 1→4 pad
- `getCompetenciesForActivity(activiteit_id)` → relevante skills
- `mapToECF(activiteit_id)` → eCF area
- `resolveAlias(term, type)` → canonical ID
- `searchBeroepstaken(filters)` → flexible filtering

---

## Success criteria

### Technical quality

- ✅ Zero `any` types (zonder documented exceptions)
- ✅ >80% test coverage
- ✅ All linter rules passing
- ✅ JSON validates tegen schema
- ✅ TypeScript strict mode enabled

### User experience (AI assistants)

- ✅ "Wat moet ik kunnen op niveau 3 voor Software Analyseren?" → correcte beroepstaak
- ✅ "Welke taken focussen op security?" → gefilterde lijst
- ✅ "Laat progressie zien van niveau 1-4 voor Ontwerpen/Infrastructuur" → progression path
- ✅ "Hoe mapt HBO-i naar e-CF?" → crosswalk informatie

---

## Risico's & mitigaties

| Risico                                  | Impact | Mitigatie                                              |
| --------------------------------------- | ------ | ------------------------------------------------------ |
| JSON Schema wijzigt tijdens development | Hoog   | Types auto-genereren, validation bij elke build        |
| MCP SDK API changes                     | Medium | Pin SDK versie, upgrade bewust                         |
| Dataset incompleet                      | Medium | Begin met subset, architectuur ondersteunt uitbreiding |
| TypeScript compilation errors           | Medium | Iteratieve type generatie, custom types waar nodig     |

---

## Wat wil je dat ik doe?

Ik kan voor je uitwerken:

- ✅ Volledige MCP server skeleton (TypeScript, clean architecture, production-ready)
- ✅ JSON Schema → TypeScript types generator integratie
- ✅ MCP resources + tools voor alle entiteiten
- ✅ Test setup (Jest)
- ✅ Claude Desktop configuratie voor lokaal gebruik

Of wil je eerst een klein MCP SDK voorbeeld zien om het protocol te begrijpen?
