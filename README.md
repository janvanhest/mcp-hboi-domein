# HBO-i Domeinbeschrijving – Canonieke Dataset

Een machine-leesbare, gevalideerde dataset van de HBO-i (Hoger Beroepsonderwijs Informatica) domeinbeschrijving, ontsloten via MCP (Model Context Protocol) voor gebruik door AI-assistenten.

## Overzicht

Deze repository bevat:

- **JSON Schema** voor validatie en type-generatie
- **Canonieke dataset** met competenties, beroepstaken en vaardigheden
- **MCP Server** voor integratie met Claude, ChatGPT en andere AI-clients
- **Documentatie** van het HBO-i competentiemodel

### Doel

AI-modellen consistente, traceerbare toegang geven tot HBO-i begrippen, zodat:

- Studenten betrouwbare competentie-informatie krijgen
- Docenten AI kunnen gebruiken voor curriculumontwikkeling
- Organisaties gestandaardiseerde HBO-i referenties hebben
- Beoordelingen gebaseerd zijn op de officiële domeinbeschrijving

---

## Het Model

![HBO-i Domeinmodel Visualisatie](./hboi-model-visualisatie.png)

Het HBO-i competentiemodel is gestructureerd als een **3-dimensionale matrix** omringd door transversale vaardigheden.

### Kern: Beroepstaken Matrix (3D)

Elke **beroepstaak** wordt gedefinieerd door de kruising van drie dimensies:

```
Beroepstaak = Activiteit × Architectuurlaag × Beheersingsniveau
```

**Dimensie 1: Activiteiten (5)** – _Wat doe je?_

- `act.analyseren` – Analyseren van processen, producten en informatiestromen
- `act.adviseren` – Adviseren over ICT-oplossingen en -strategieën
- `act.ontwerpen` – Ontwerpen van systemen, architecturen en oplossingen
- `act.realiseren` – Realiseren en implementeren van ICT-producten
- `act.manage_control` – Managen en controleren van ICT-processen

**Dimensie 2: Architectuurlagen (5)** – _Waar werk je aan?_

- `arch.gebruikersinteractie` – User interfaces, UX, front-end
- `arch.organisatieprocessen` – Business processes, workflows
- `arch.infrastructuur` – Netwerken, cloud, platformen
- `arch.software` – Applicatieontwikkeling, backend, services
- `arch.hardware_interfacing` – Embedded systems, IoT, robotica

**Dimensie 3: Beheersingsniveaus (4)** – _Hoe complex?_

1. **Taakgericht** – Met begeleiding, eenvoudige context
2. **Probleemgericht** – Beperkte zelfstandigheid, bekende problemen
3. **Situatiegericht** – Hoog zelfstandig, vage problemen, innovatief
4. **Professiegericht** – Expert, strategisch, breed domein

**Totaal mogelijk:** 5 × 5 × 4 = 100 beroepstaken  
_(In praktijk ~40-60 exemplarische taken gedocumenteerd)_

### Context: Professional Skills (4 aandachtsgebieden)

Transversale competenties die bij alle beroepstaken relevant zijn:

- **Toekomstgericht organiseren** – Organisatorische context, ethiek, procesmanagement
- **Onderzoekend vermogen** – Methodische aanpak, onderzoek, oplossingen
- **Persoonlijk leiderschap** – Ondernemerschap, ontwikkeling, profilering
- **Doelgericht interacteren** – Partners, communicatie, samenwerking

Elk aandachtsgebied bevat 3 competenties (totaal 12 professional skills).

---

## Datamodel

### Schema Versie

Gebaseerd op JSON Schema Draft 2020-12 met strikte validatie:

- `additionalProperties: false` voor alle objecten
- Unieke ID-patronen met prefixes (`act.*`, `arch.*`, `bt.*`, `ps.*`)
- Enum constraints voor gestandaardiseerde waarden
- Foreign key validatie via pattern matching

### Hoofdstructuur

```json
{
  "meta": {
    "schema_version": "1.0.0",
    "dataset_version": "HBO-i 2024",
    "generated_at": "2024-10-02T...",
    "language": "nl",
    "source": {
      /* Bronverwijzing */
    }
  },
  "beheersingsniveaus": [
    /* 4 niveaus */
  ],
  "activiteiten": [
    /* 5 activiteiten */
  ],
  "architectuurlagen": [
    /* 5 lagen */
  ],
  "professional_skills": {
    "aandachtsgebieden": [
      /* 4 gebieden met elk 3 competenties */
    ]
  },
  "beroepstaken": [
    /* ~40-60 taken */
  ],
  "raamwerken": {
    "ecf": {
      /* e-CF mapping */
    },
    "sfia": {
      /* SFIA mapping */
    },
    "nlqf_eqf_qf": [
      /* Kwalificatieniveaus */
    ]
  },
  "verbanden": {
    "activiteit_naar_professional_skills": [
      /* Relaties */
    ]
  }
}
```

### Entiteiten Detail

#### Activiteit

```typescript
{
  id: string;              // "act.analyseren"
  naam: string;            // "Analyseren"
  beschrijving: string;
  koppelingen?: {
    ecf_areas?: string[];  // ["Plan", "Build"]
    sfia_note?: string;
  };
  aliases?: string[];      // ["Analyse", "Requirements engineering"]
}
```

#### Architectuurlaag

```typescript
{
  id: string;              // "arch.software"
  naam: string;            // "Software"
  beschrijving: string;
  aliases?: string[];      // ["Backend", "Applicatieontwikkeling"]
}
```

#### Beheersingsniveau

```typescript
{
  id: 1 | 2 | 3 | 4;
  naam: 'Taakgericht' |
    'Probleemgericht' |
    'Situatiegericht' |
    'Professiegericht';
  beschrijving: string;
  criteria: {
    zelfstandigheid: string;
    complexiteit_context: string;
    inhoud: string;
  }
}
```

#### Professional Skill

```typescript
{
  aandachtsgebieden: [{
    id: string;            // "ps.onderzoekend_vermogen"
    naam: string;          // "Onderzoekend vermogen"
    beschrijving: string;
    competenties: [{       // Exact 3 competenties
      id: string;          // "ps.competentie.methodische_probleemaanpak"
      naam: string;
      beschrijving: string;
    }]
  }]
}
```

#### Beroepstaak

```typescript
{
  id: string;                    // "bt.software.analyseren.3"
  titel?: string;
  beschrijving: string;
  activiteit_id: string;         // "act.analyseren"
  architectuurlaag_id: string;   // "arch.software"
  beheersingsniveau_id: 1-4;     // 3
  kwaliteitseisen?: Array<       // Gestandaardiseerde concerns
    "security" | "privacy" | "duurzaamheid" | "budget" |
    "tijd" | "performance" | "toegankelijkheid" | "compliance"
  >;
  voorbeelden?: string[];
  bronverwijzing?: {
    pagina?: number;
    paragraaf?: string;
  };
  role?: "exemplar" | "definitief";
}
```

---

## Internationale Raamwerken

### e-CF (European e-Competence Framework)

Mapping van HBO-i activiteiten naar e-CF areas:

| HBO-i Activiteit | e-CF Area  |
| ---------------- | ---------- |
| Analyseren       | Plan       |
| Adviseren        | Plan       |
| Ontwerpen        | Plan/Build |
| Realiseren       | Build      |
| Manage & Control | Run        |

### SFIA (Skills Framework for the Information Age)

Beheersingsniveaus indicatief gerelateerd aan SFIA levels 1-7.

### NLQF/EQF/QF-EHEA

Crosswalk van HBO kwalificaties (AD/Bachelor/Master) met:

- NLQF (Nederlands Kwalificatieraamwerk)
- EQF (European Qualifications Framework)
- QF-EHEA (Qualifications Framework European Higher Education Area)

Voorbeeld:

```json
{
  "qualification": "Bachelor",
  "nlqf": 6,
  "eqf": 6,
  "qf_ehea_cycle": "1",
  "sfia_level_hint": 3-4,
  "hboi_beheersingsniveau_hint": 2-3
}
```

---

## Gebruik

### Schema Validatie

```bash
# Node.js met Ajv
npm install ajv ajv-formats
node validate.js hboi.full.json
```

```javascript
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const schema = require('./hboi.schema.json');
const data = require('./hboi.full.json');

const ajv = new Ajv({ strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error(validate.errors);
}
```

### TypeScript Types Genereren

```bash
npm install -g json-schema-to-typescript
json-schema-to-typescript hboi.schema.json > src/types/hboi.types.ts
```

### MCP Server Integratie

_(Coming soon – zie [MCP Setup](#mcp-setup))_

Query voorbeelden:

```typescript
// Krijg specifieke beroepstaak
getBeroepstaak({
  activiteit: 'act.analyseren',
  architectuurlaag: 'arch.software',
  beheersingsniveau: 3,
});

// Krijg progressie pad voor één competentie
getProgressionPath({
  activiteit: 'act.ontwerpen',
  architectuurlaag: 'arch.infrastructuur',
});
// → [niveau 1, niveau 2, niveau 3, niveau 4]

// Zoek beroepstaken met quality concern
searchByQualityRequirement({ kwaliteitseis: 'security' });

// Krijg alle taken op mastery niveau
getTasksByLevel({ niveau: 4 });
```

---

## Project Structuur

```
mcp-competentie/
├── README.md                    # Dit bestand
├── hboi.schema.json             # JSON Schema definitie
├── hboi.example.json            # Voorbeeld dataset (subset)
├── hboi.full.json               # Volledige dataset (TODO)
├── hboi-model-visualisatie.png  # 3D model afbeelding
│
├── src/                         # MCP Server (TODO)
│   ├── data/                    # Data loading & validatie
│   ├── services/                # Business logic (queries)
│   ├── types/                   # Generated TypeScript types
│   └── mcp/                     # MCP server resources & tools
│
├── tests/                       # Unit & integration tests
├── docs/                        # Uitgebreide documentatie
│
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Roadmap

### ✅ Fase 1: Foundation (Done)

- [x] JSON Schema definitie
- [x] Voorbeeld dataset
- [x] Documentatie

### 🚧 Fase 2: Data Extractie (In Progress)

- [ ] Volledige HBO-i dataset extraheren
- [ ] Alle 5 × 5 × 4 beroepstaken documenteren
- [ ] Professional skills volledig uitwerken
- [ ] Bronverwijzingen toevoegen

### 📋 Fase 3: MCP Server (Planned)

- [ ] TypeScript MCP server met @modelcontextprotocol/sdk
- [ ] Resources voor entiteiten (activiteiten, lagen, niveaus, skills)
- [ ] Tools voor queries (getBeroepstaak, searchByLevel, etc.)
- [ ] Unit tests met Jest
- [ ] Claude Desktop configuratie

### 📋 Fase 4: Advanced Features (Future)

- [ ] GraphQL API wrapper (optioneel)
- [ ] REST API met NestJS (indien nodig)
- [ ] Web dashboard voor browsing
- [ ] Export naar SKOS/RDF voor Linked Data
- [ ] PDF generator voor competentieprofielen

---

## MCP Setup

_(Deze sectie wordt uitgebreid zodra de MCP server is geïmplementeerd)_

### Installatie

```bash
npm install
npm run build
```

### Claude Desktop Configuratie

```json
{
  "mcpServers": {
    "hboi": {
      "command": "node",
      "args": ["/path/to/mcp-competentie/dist/index.js"],
      "env": {}
    }
  }
}
```

### Gebruik in AI Conversaties

```
Gebruiker: "Wat moet ik kunnen op niveau 3 voor Software Analyseren?"

Claude: [Raadpleegt MCP server via getBeroepstaak tool]
        "Op niveau 3 (Situatiegericht) moet je voor Software Analyseren:
        - Requirements-analyse uitvoeren met stakeholders
        - Werken in context van bestaande systemen
        - Voorbeelden: CRM-integratie analyse, security requirements..."
```

---

## Bronnen

### HBO-i Domeinbeschrijving

- **Titel:** HBO-i Domeinbeschrijving
- **Uitgever:** Vereniging Hogescholen / NHL Stenden / SOICT
- **Jaar:** 2024 _(exacte versie nog toe te voegen)_
- **ISBN:** _(nog toe te voegen)_
- **Licentie:** _(nog te specificeren)_

### Gerelateerde Frameworks

- [e-CF (European e-Competence Framework)](https://www.ecompetences.eu/)
- [SFIA (Skills Framework for the Information Age)](https://sfia-online.org/)
- [NLQF (Nederlands Kwalificatieraamwerk)](https://www.nlqf.nl/)
- [Model Context Protocol (MCP) by Anthropic](https://modelcontextprotocol.io/)

---

## Bijdragen

### Data Correcties

Heb je een fout gevonden of suggestie voor verbetering?

1. Check het JSON Schema (`hboi.schema.json`)
2. Valideer je wijziging lokaal
3. Maak een issue of pull request
4. Voeg bronverwijzing toe (pagina + paragraaf)

### Code Bijdragen

- Volg TypeScript best practices
- Schrijf unit tests voor nieuwe features
- Gebruik `npm run lint` en `npm run test` voor validation
- Geen `any` types zonder gedocumenteerde reden

---

## Licentie

_(Nog te bepalen – afhankelijk van HBO-i bronmateriaal licentie)_

De code in deze repository (MCP server, tooling) valt onder [MIT License].  
De HBO-i dataset zelf volgt de licentie van de officiële domeinbeschrijving.

---

## Contact

Voor vragen over:

- **Schema/data structuur:** Open een GitHub issue
- **MCP implementatie:** Zie [MCP documentatie](https://modelcontextprotocol.io/)
- **HBO-i officieel:** Raadpleeg [Vereniging Hogescholen](https://www.vereniginghogescholen.nl/)

---

**Status:** 🚧 Work in Progress – Schema definitie compleet, volledige dataset in ontwikkeling
