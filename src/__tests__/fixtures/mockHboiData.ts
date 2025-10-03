/**
 * Mock HBOI Data Fixtures for Testing
 * 
 * Provides realistic test data that conforms to the HBOI schema
 */

import type { HBOIDomeinbeschrijvingCanoniekeDataset } from '../../types/hboi.types';

export const mockMeta = {
  schema_version: '1.0.0',
  dataset_version: 'test-1.0.0',
  generated_at: '2024-01-01T00:00:00Z',
  language: 'nl',
  source: {
    title: 'HBO-i Domeinbeschrijving - Test Dataset',
    publisher: 'HBO-i',
    year: 2024,
    isbn: '978-90-834007-1-6',
    license: 'CC BY-NC-ND',
    license_url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    document_url: 'https://www.hbo-i.nl',
  },
};

export const mockBeheersingsniveaus = [
  {
    id: 1,
    naam: 'Taakgericht',
    beschrijving:
      'Werkt onder algemene richtlijnen in een omgeving waar onvoorspelbare veranderingen optreden.',
    criteria: {
      zelfstandigheid:
        'Werkt onder algemene richtlijnen in een omgeving waar onvoorspelbare veranderingen optreden.',
      complexiteit_context:
        'Gestructureerd - voorspelbare context, probleem gedefinieerd, aanpak en oplossing bekend bij opdrachtgever.',
      complexiteit_inhoud:
        'Enkele basisconcepten die voortbouwen op vooropleiding.',
    },
  },
  {
    id: 2,
    naam: 'Probleemgericht',
    beschrijving:
      'Lost zelfstandig interactieve vraagstukken op die voortkomen uit projectactiviteiten.',
    criteria: {
      zelfstandigheid:
        'Lost zelfstandig interactieve vraagstukken op die voortkomen uit projectactiviteiten.',
      complexiteit_context:
        'Gestructureerd - onvoorspelbare context, probleem gegeven, keuze van aanpak en oplossingsruimte beperkt.',
      complexiteit_inhoud:
        'Combinatie van meerdere basisconcepten en enkele verdiepingsconcepten die voortbouwen op basisconcepten.',
    },
  },
  {
    id: 3,
    naam: 'Situatiegericht',
    beschrijving:
      'Werkt zelfstandig om interactieve problemen op te lossen. Heeft een positief effect op teamprestaties.',
    criteria: {
      zelfstandigheid:
        'Werkt zelfstandig om interactieve problemen op te lossen. Heeft een positief effect op teamprestaties.',
      complexiteit_context:
        'Gestructureerd - onvoorspelbare context, vage problemen, aanpak en oplossingsruimte open.',
      complexiteit_inhoud:
        'Combinatie van meerdere concepten voor verdieping en innovatie in de lokale situatie.',
    },
  },
  {
    id: 4,
    naam: 'Professiegericht',
    beschrijving:
      'Coördineert en stuurt. Pakt vraagstukken aan met veel interacterende factoren.',
    criteria: {
      zelfstandigheid:
        'Coördineert en stuurt. Pakt vraagstukken aan met veel interacterende factoren.',
      complexiteit_context:
        'Ongestructureerd multidisciplinair en/of specialistisch context.',
      complexiteit_inhoud:
        'Nieuwe concepten voor verdieping en innovatie die overdraagbaar zijn naar andere situaties.',
    },
  },
];

export const mockActiviteiten = [
  {
    id: 'act.analyseren' as const,
    naam: 'Analyseren' as const,
    beschrijving:
      'Het analyseren van processen, producten en informatiestromen in hun onderlinge samenhang en context.',
    koppelingen: {
      ecf_areas: ['Plan' as const],
      sfia_note: 'Analyse en requirements engineering',
      ecf_context:
        "e-CF dimension 1 (areas): de activiteit 'analyseren' valt grofweg binnen een deel van het 'area' 'Plan' onderscheiden binnen dimension 1.",
    },
    kwaliteitsaspecten: ['security', 'budget', 'tijd', 'duurzaamheid'] as const,
  },
  {
    id: 'act.adviseren' as const,
    naam: 'Adviseren' as const,
    beschrijving:
      'Het adviseren over de inrichting van processen en/of informatie voor een nieuw te ontwikkelen, aan te schaffen of aan te passen ICT-systeem.',
    koppelingen: {
      ecf_areas: ['Plan' as const],
      sfia_note: 'Business analysis en consultancy',
      ecf_context:
        "e-CF dimension 1 (areas): de activiteit 'adviseren' valt grofweg binnen een deel van het 'area' 'Plan' onderscheiden binnen dimension 1.",
    },
    kwaliteitsaspecten: ['security', 'budget', 'tijd', 'duurzaamheid'] as const,
  },
  {
    id: 'act.ontwerpen' as const,
    naam: 'Ontwerpen' as const,
    beschrijving:
      'Het ontwerpen van een (onderdeel van een) ICT-systeem op basis van requirements.',
    koppelingen: {
      ecf_areas: ['Plan' as const, 'Build' as const],
      sfia_note: 'Solution architecture en design',
      ecf_context:
        "e-CF dimension 1 (areas): de activiteit 'ontwerpen' valt grofweg binnen een deel van het 'area' 'Plan' onderscheiden binnen dimension 1.",
    },
    kwaliteitsaspecten: ['security', 'budget', 'tijd', 'duurzaamheid'] as const,
  },
  {
    id: 'act.realiseren' as const,
    naam: 'Realiseren' as const,
    beschrijving:
      'Het realiseren en testen van een (onderdeel van een) ICT-systeem op basis van een ontwerp.',
    koppelingen: {
      ecf_areas: ['Build' as const],
      sfia_note: 'Development en implementation',
      ecf_context:
        "e-CF dimension 1 (areas): de activiteit 'realiseren' valt grofweg binnen het 'area' 'Build' onderscheiden binnen dimension 1.",
    },
    kwaliteitsaspecten: ['security', 'budget', 'tijd', 'duurzaamheid'] as const,
  },
  {
    id: 'act.manage_control' as const,
    naam: 'Manage & Control' as const,
    beschrijving:
      'Het beheren, monitoren en optimaliseren van de ontwikkeling, ingebruikname en het gebruik van ICT-systemen.',
    koppelingen: {
      ecf_areas: ['Run' as const],
      sfia_note: 'Service management en operations',
      ecf_context:
        "e-CF dimension 1 (areas): de activiteit 'manage & control' valt overwegend binnen het 'area' 'Run' onderscheiden binnen dimension 1.",
    },
    kwaliteitsaspecten: ['security', 'budget', 'tijd', 'duurzaamheid'] as const,
  },
];

export const mockArchitectuurlagen = [
  {
    id: 'arch.gebruikersinteractie',
    naam: 'Gebruikersinteractie',
    beschrijving:
      'Communicatie tussen de (eind)gebruiker en het ICT-systeem. Dit betreft niet de interactie met gebruikers tijdens de ontwikkeling van een ICT-systeem, aangezien dat relevant is voor alle architectuurlagen.',
    activiteit_niveau_beschrijvingen: [
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Identificeren van de kernelementen van een externe opdracht waarbij verduidelijking wordt gezocht bij opdrachtgever, eindgebruikers en experts',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Benchmarken van functionaliteit, gebruikerservaring, toegankelijkheid, en andere ontwerpaspecten voor een opdrachtgever',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Analyseren van de eindgebruiker en gebruikersinteractie en -ervaring, zowel individueel (fysiek, psychologisch, persoonlijke karakteristieken) als in grotere maatschappelijke context (sociaal, cultureel, ethisch, technologisch)',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Analyseren van maatschappelijke en/of domeinspecifieke trends & kansen en hierover op strategisch niveau communiceren met de key stakeholders',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Inventariseren van opdrachtgevers- en eindgebruikersbehoeften en deze vertalen naar ict-middelen',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Analyseren van bestaande producten of diensten in relatie tot gebruikersbehoeften en kernwaarden van de opdrachtgever',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Inventariseren van relevante data-visualisaties voor een dataset',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Doorlopend evalueren van het effect van de interventie op de gebruikerservaring',
      },
    ],
  },
  {
    id: 'arch.infrastructuur',
    naam: 'Infrastructuur',
    beschrijving:
      'Het geheel van ICT-systemen die worden gebruikt om organisatieprocessen te faciliteren. Het gaat om het beschikbaar maken, beschikbaar houden en configureren van traditionele hardware-infrastructuur, maar ook software-infrastructuur.',
    activiteit_niveau_beschrijvingen: [
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Analyseren van een enkel(e) organisatie, organisatieproces of procesbesturing op operationeel niveau met bijbehorende gegevensstromen en (gestructureerde) databehoeften',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Analyseren van meerdere operationele en tactische organisatieprocessen, inclusief kwaliteit van de bijbehorende data en van de huidige en toekomstige ict-voorziening',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Analyseren van de consequenties van een (strategische) koerswijziging voor organisatieprocessen en bijbehorende informatievoorziening',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Uitvoeren van grondig theoretisch onderbouwd toegepast onderzoek naar technologische (inter-organisatorische) procesinnovaties',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Adviseren over verbeteringen voor een enkel organisatieproces op het terrein van organisatie(structuur), processen en gestructureerde data, met inachtneming van de mogelijkheden van ict',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Samenhangende oplossingen adviseren voor knelpunten op het terrein van organisatiestructuur, processtructuur en informatievoorziening',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Adviseren over de inrichting van en afstemming tussen business en ict (alignment en governance), rekening houdend met de doelstellingen van de organisatie',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Adviseren van organisatorische en technologische (interorganisatorische) procesinnovaties, waarbij rekening wordt gehouden met alle relevante interne en externe stakeholders, de sociale context (mens, maatschappij en organisatie) en ethische en juridische aspecten',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Ontwerpen van een eenvoudige infrastructuur voor een enkel systeem',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Ontwerpen van een infrastructuur voor meerdere systemen met basis integratie',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Ontwerpen van een complexe infrastructuur met geavanceerde integratie en beveiliging',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Ontwerpen van een enterprise-infrastructuur met multi-cloud en hybride architectuur',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Implementeren van een eenvoudige infrastructuur component',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Implementeren van een infrastructuur met basis monitoring en logging',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Implementeren van een geavanceerde infrastructuur met automatisering en orchestration',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Implementeren van een enterprise-infrastructuur met volledige automatisering en self-healing capabilities',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Beheren van een eenvoudige infrastructuur met basis monitoring',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Beheren van een infrastructuur met geavanceerde monitoring en incident management',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Beheren van een complexe infrastructuur met proactieve monitoring en capacity planning',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Beheren van een enterprise-infrastructuur met volledige automatisering en predictive analytics',
      },
    ],
  },
  {
    id: 'arch.software',
    naam: 'Software',
    beschrijving:
      'Het ontwikkelen van diverse soorten software die na oplevering wordt opgenomen in een ICT-infrastructuur.',
    activiteit_niveau_beschrijvingen: [
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Analyseren van een eenvoudig softwaresysteem met beperkte functionaliteit',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Analyseren van een softwaresysteem met meerdere componenten en basis integratie',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Analyseren van een complex softwaresysteem met geavanceerde architectuur en integratie',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Analyseren van een enterprise softwaresysteem met microservices en cloud-native architectuur',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Adviseren over eenvoudige software-oplossingen voor basis functionaliteit',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Adviseren over software-oplossingen met meerdere componenten en integratie',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Adviseren over complexe software-oplossingen met geavanceerde architectuur',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Adviseren over enterprise software-oplossingen met cloud-native en microservices architectuur',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Ontwerpen van een eenvoudig softwaresysteem met basis functionaliteit',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Ontwerpen van een softwaresysteem met meerdere componenten en basis integratie',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Ontwerpen van een complex softwaresysteem met geavanceerde architectuur en integratie',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Ontwerpen van een enterprise softwaresysteem met microservices en cloud-native architectuur',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Implementeren van een eenvoudig softwaresysteem met basis functionaliteit',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Implementeren van een softwaresysteem met meerdere componenten en basis integratie',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Implementeren van een complex softwaresysteem met geavanceerde architectuur en integratie',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Implementeren van een enterprise softwaresysteem met microservices en cloud-native architectuur',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Beheren van een eenvoudig softwaresysteem met basis monitoring',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Beheren van een softwaresysteem met geavanceerde monitoring en logging',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Beheren van een complex softwaresysteem met proactieve monitoring en performance optimization',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Beheren van een enterprise softwaresysteem met volledige automatisering en predictive analytics',
      },
    ],
  },
  {
    id: 'arch.organisatieprocessen',
    naam: 'Organisatieprocessen',
    beschrijving:
      'Het faciliteren van organisatieprocessen door middel van ICT-systemen. Het gaat om de functionaliteit van het systeem als geheel (geautomatiseerde en niet-geautomatiseerde delen), bezien vanuit de context van de te behalen organisatiedoelen.',
    activiteit_niveau_beschrijvingen: [
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Analyseren van een enkel(e) organisatie, organisatieproces of procesbesturing op operationeel niveau met bijbehorende gegevensstromen en (gestructureerde) databehoeften',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 1,
        sub_aspect: 'Knelpunten en oorzaak-gevolgrelaties',
        beschrijving:
          'Analyseren van knelpunten en oorzaak-gevolgrelaties vanuit de invalshoek van de informatievoorziening',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 1,
        sub_aspect: 'ICT-mogelijkheden',
        beschrijving:
          'Analyseren van beschikbare ict-mogelijkheden in het veld',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Analyseren van meerdere operationele en tactische organisatieprocessen, inclusief kwaliteit van de bijbehorende data en van de huidige en toekomstige ict-voorziening',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 2,
        sub_aspect: 'Samenhang knelpunten',
        beschrijving:
          'Analyseren van de samenhang van knelpunten en oorzaak-gevolgrelaties',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 2,
        sub_aspect: 'ICT-requirements',
        beschrijving:
          'Vaststellen van de ict-requirements vanuit de behoefte van relevante stakeholders',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Analyseren van de consequenties van een (strategische) koerswijziging voor organisatieprocessen en bijbehorende informatievoorziening',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 3,
        sub_aspect: 'Huidige en toekomstige situatie',
        beschrijving:
          'Analyseren (kwantitatief en/ of kwalitatief) van de huidige en toekomstige situatie op het gebied van bijvoorbeeld beleid, strategie, alignment en architectuur',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 3,
        sub_aspect: 'Acceptatie en weerstanden',
        beschrijving:
          'Analyseren van de acceptatie van en eventuele weerstanden tegen de huidige en vernieuwde technologie en organisatieprocessen',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Uitvoeren van grondig theoretisch onderbouwd toegepast onderzoek naar technologische (inter-organisatorische) procesinnovaties',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Adviseren over verbeteringen voor een enkel organisatieproces op het terrein van organisatie(structuur), processen en gestructureerde data, met inachtneming van de mogelijkheden van ict',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Samenhangende oplossingen adviseren voor knelpunten op het terrein van organisatiestructuur, processtructuur en informatievoorziening',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 2,
        sub_aspect: 'Nieuwe ICT-mogelijkheden',
        beschrijving:
          'Adviseren over nieuwe ict-mogelijkheden, waaronder pakketselectie',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Adviseren over de inrichting van en afstemming tussen business en ict (alignment en governance), rekening houdend met de doelstellingen van de organisatie',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 3,
        sub_aspect: 'Veranderkundige aanpak',
        beschrijving:
          'Adviseren over een veranderkundige aanpak bij de invoering van nieuwe, duurzame ict-mogelijkheden en organisatieprocessen',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 3,
        sub_aspect: 'Gestructureerde en ongestructureerde data',
        beschrijving:
          'Adviseren over oplossingen voor gestructureerde en ongestructureerde data, rekening houdend met ethische en juridische aspecten',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Adviseren van organisatorische en technologische (interorganisatorische) procesinnovaties, waarbij rekening wordt gehouden met alle relevante interne en externe stakeholders, de sociale context (mens, maatschappij en organisatie) en ethische en juridische aspecten',
      },
    ],
  },
  {
    id: 'arch.hardware_interfacing',
    naam: 'Hardware interfacing',
    beschrijving:
      "Software die interacteert met beschikbare hardware. Het betreft situaties waarbij de software expliciet rekening moet houden met de mogelijkheden en beperkingen van de beschikbare hardware. Binnen deze architectuurlaag wordt 'systeem' gekozen als generieke, overkoepelende term, die afhankelijk van de context verder kan worden gespecificeerd als 'embedded system', 'industrial automation', 'virtual system', etc.",
    activiteit_niveau_beschrijvingen: [
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Analyseren van een eenvoudig systeem met een beperkt aantal sensoren en actuatoren',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Analyseren van een systeem met meerdere sensoren en actuatoren en basis communicatie',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Analyseren van een complex systeem met geavanceerde sensoren, actuatoren en real-time communicatie',
      },
      {
        activiteit_id: 'act.analyseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Analyseren van een zeer complex systeem met meerdere sensoren, actuatoren en de interactie daartussen, rekening houdend met real-time constraints en veiligheidsaspecten',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Adviseren over eenvoudige hardware-oplossingen voor basis functionaliteit',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Adviseren over hardware-oplossingen met meerdere componenten en basis integratie',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Adviseren over complexe hardware-oplossingen met geavanceerde integratie en real-time constraints',
      },
      {
        activiteit_id: 'act.adviseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Adviseren over enterprise hardware-oplossingen met volledige automatisering en veiligheidsaspecten',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Ontwerpen van een eenvoudig systeem met basis hardware-interfacing',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Ontwerpen van een systeem met meerdere hardware-componenten en basis communicatie',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Ontwerpen van een complex systeem met geavanceerde hardware-integratie en real-time constraints',
      },
      {
        activiteit_id: 'act.ontwerpen' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Ontwerpen van een enterprise systeem met volledige hardware-automatisering en veiligheidsarchitectuur',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Implementeren van een eenvoudig systeem met basis hardware-interfacing',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Implementeren van een systeem met meerdere hardware-componenten en basis communicatie',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Implementeren van een complex systeem met geavanceerde hardware-integratie en real-time constraints',
      },
      {
        activiteit_id: 'act.realiseren' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Implementeren van een enterprise systeem met volledige hardware-automatisering en veiligheidsmaatregelen',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 1,
        beschrijving:
          'Beheren van een eenvoudig systeem met basis hardware-monitoring',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 2,
        beschrijving:
          'Beheren van een systeem met geavanceerde hardware-monitoring en logging',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 3,
        beschrijving:
          'Beheren van een complex systeem met proactieve hardware-monitoring en performance optimization',
      },
      {
        activiteit_id: 'act.manage_control' as const,
        beheersingsniveau_id: 4,
        beschrijving:
          'Beheren van een enterprise systeem met volledige hardware-automatisering en predictive analytics',
      },
    ],
  },
];

export const mockProfessionalSkills = {
  aandachtsgebieden: [
    {
      id: 'ps.onderzoekend_vermogen',
      naam: 'Onderzoekend vermogen',
      beschrijving: 'Het vermogen om systematisch onderzoek te verrichten.',
      competenties: [
        {
          id: 'ps.competentie.methodische_probleemaanpak',
          naam: 'Methodische probleemaanpak',
          beschrijving: 'Hanteert een methodische aanpak.',
        },
        {
          id: 'ps.competentie.onderzoek',
          naam: 'Onderzoek',
          beschrijving: 'Voert systematisch onderzoek uit.',
        },
        {
          id: 'ps.competentie.communicatie',
          naam: 'Communicatie',
          beschrijving: 'Communiceert effectief.',
        },
      ],
    },
    {
      id: 'ps.persoonlijk_leiderschap',
      naam: 'Persoonlijk leiderschap',
      beschrijving: 'Het vermogen om leiding te geven.',
      competenties: [
        {
          id: 'ps.competentie.ondernemend_zijn',
          naam: 'Ondernemend zijn',
          beschrijving: 'Toont ondernemerschap.',
        },
      ],
    },
  ],
};

export const mockBeroepstaken = [
  {
    id: 'bt.software.analyseren.1',
    titel: 'Eenvoudige software analyse',
    beschrijving: 'Uitvoeren van een eenvoudige software analyse.',
    activiteit_id: 'act.analyseren',
    architectuurlaag_id: 'arch.software',
    beheersingsniveau_id: 1,
    kwaliteitseisen: ['security' as const],
    voorbeelden: ['Basis analyse van een webapplicatie.'],
    bronverwijzing: {
      pagina: 45,
      paragraaf: '3.2.1',
    },
    role: 'exemplar',
  },
  {
    id: 'bt.software.analyseren.2',
    titel: 'Middelmatige software analyse',
    beschrijving: 'Uitvoeren van een middelmatige software analyse.',
    activiteit_id: 'act.analyseren',
    architectuurlaag_id: 'arch.software',
    beheersingsniveau_id: 2,
    kwaliteitseisen: ['security' as const, 'performance' as const],
    voorbeelden: ['Analyse van een multi-tier applicatie.'],
    bronverwijzing: {
      pagina: 45,
      paragraaf: '3.2.1',
    },
    role: 'exemplar',
  },
  {
    id: 'bt.software.analyseren.3',
    titel: 'Requirements-analyse voor softwaresysteem',
    beschrijving: 'Uitvoeren van een requirements-analyse.',
    activiteit_id: 'act.analyseren',
    architectuurlaag_id: 'arch.software',
    beheersingsniveau_id: 3,
    kwaliteitseisen: ['security' as const, 'performance' as const],
    voorbeelden: [
      'Analyse uitvoeren op de integratie van een nieuw CRM-systeem.',
      'Inventariseren van security-eisen.',
    ],
    bronverwijzing: {
      pagina: 45,
      paragraaf: '3.2.1',
    },
    role: 'exemplar',
  },
  {
    id: 'bt.software.analyseren.4',
    titel: 'Complexe software analyse',
    beschrijving: 'Uitvoeren van een complexe software analyse.',
    activiteit_id: 'act.analyseren',
    architectuurlaag_id: 'arch.software',
    beheersingsniveau_id: 4,
    kwaliteitseisen: ['security' as const, 'performance' as const, 'scalability' as const],
    voorbeelden: ['Enterprise software architectuur analyse.'],
    bronverwijzing: {
      pagina: 45,
      paragraaf: '3.2.1',
    },
    role: 'exemplar',
  },
  {
    id: 'bt.software.realiseren.2',
    titel: 'Software component implementeren',
    beschrijving: 'Implementeren van een software component.',
    activiteit_id: 'act.realiseren',
    architectuurlaag_id: 'arch.software',
    beheersingsniveau_id: 2,
    kwaliteitseisen: ['performance' as const],
    voorbeelden: ['Bouwen van een REST API endpoint.'],
    bronverwijzing: {
      pagina: 50,
      paragraaf: '3.3.1',
    },
    role: 'exemplar',
  },
  {
    id: 'bt.infrastructuur.adviseren.2',
    titel: 'Infrastructuur advies',
    beschrijving: 'Adviseren over infrastructuur oplossingen.',
    activiteit_id: 'act.adviseren',
    architectuurlaag_id: 'arch.infrastructuur',
    beheersingsniveau_id: 2,
    kwaliteitseisen: ['security' as const, 'reliability' as const],
    voorbeelden: ['Cloud infrastructuur advies.'],
    bronverwijzing: {
      pagina: 50,
      paragraaf: '3.3.1',
    },
    role: 'exemplar',
  },
];

export const mockVerbanden = {
  activiteit_naar_professional_skills: [
    {
      activiteit_id: 'act.analyseren',
      competentie_ids: [
        'ps.competentie.methodische_probleemaanpak',
        'ps.competentie.onderzoek',
        'ps.competentie.communicatie',
      ],
      notities: 'Analyse vereist methodische aanpak en onderzoek',
    },
  ],
};

export const mockRaamwerken = {
  ecf: {
    areas: ['Plan', 'Build', 'Run'],
    activity_area_mapping: [
      {
        activity_id: 'act.analyseren',
        ecf_area: 'Plan',
        notes: 'Analyse en requirements engineering'
      },
      {
        activity_id: 'act.adviseren',
        ecf_area: 'Plan',
        notes: 'Business analysis en consultancy'
      },
      {
        activity_id: 'act.ontwerpen',
        ecf_area: 'Plan',
        notes: 'Solution architecture en design'
      },
      {
        activity_id: 'act.realiseren',
        ecf_area: 'Build',
        notes: 'Development en implementation'
      },
      {
        activity_id: 'act.manage_control',
        ecf_area: 'Run',
        notes: 'Service management en operations'
      }
    ]
  },
  sfia: {
    levels: [
      { level: 1, description: 'Level 1 - Follow' },
      { level: 2, description: 'Level 2 - Assist' },
      { level: 3, description: 'Level 3 - Apply' },
      { level: 4, description: 'Level 4 - Enable' },
      { level: 5, description: 'Level 5 - Ensure, Advise' },
      { level: 6, description: 'Level 6 - Initiate, Influence' },
      { level: 7, description: 'Level 7 - Set Strategy, Inspire, Mobilise' }
    ],
    activity_mapping: [
      {
        activity_id: 'act.analyseren',
        sfia_level: 1,
        notes: 'Analyse en requirements engineering'
      },
      {
        activity_id: 'act.adviseren',
        sfia_level: 2,
        notes: 'Business analysis en consultancy'
      },
      {
        activity_id: 'act.ontwerpen',
        sfia_level: 3,
        notes: 'Solution architecture en design'
      },
      {
        activity_id: 'act.realiseren',
        sfia_level: 4,
        notes: 'Development en implementation'
      },
      {
        activity_id: 'act.manage_control',
        sfia_level: 5,
        notes: 'Service management en operations'
      }
    ]
  },
  nlqf_eqf_qf: {
    levels: [
      { nlqf: 5, eqf: 5, qf_ehea: 'short', description: 'Associate degree level' },
      { nlqf: 6, eqf: 6, qf_ehea: 'first', description: 'Bachelor degree level' },
      { nlqf: 7, eqf: 7, qf_ehea: 'second', description: 'Master degree level' },
      { nlqf: 8, eqf: 8, qf_ehea: 'third', description: 'Doctoral degree level' }
    ]
  },
  beheersingsniveaus_crosswalk: [
    {
      hboi_niveau: 1,
      nlqf: 5,
      qf_ehea: 'short' as const,
      eqf: 5,
      ecf_proficiency: 'e2' as const,
      sfia_responsibility: 2,
      bron: {
        pagina: 27,
        sectie: 'kruistabel beheersingsniveaus',
      },
    },
    {
      hboi_niveau: 2,
      nlqf: 6,
      qf_ehea: 'first' as const,
      eqf: 6,
      ecf_proficiency: 'e3' as const,
      sfia_responsibility: 3,
      bron: {
        pagina: 27,
        sectie: 'kruistabel beheersingsniveaus',
      },
    },
    {
      hboi_niveau: 3,
      nlqf: 7,
      qf_ehea: 'second' as const,
      eqf: 7,
      ecf_proficiency: 'e4' as const,
      sfia_responsibility: 4,
      bron: {
        pagina: 27,
        sectie: 'kruistabel beheersingsniveaus',
      },
    },
    {
      hboi_niveau: 4,
      nlqf: 8,
      qf_ehea: 'third' as const,
      eqf: 8,
      ecf_proficiency: 'e5' as const,
      sfia_responsibility: 5,
      bron: {
        pagina: 27,
        sectie: 'kruistabel beheersingsniveaus',
      },
    },
  ],
};

export const mockBijlagen = {
  bronnen: [
    {
      titel: 'European e-Competence Framework (e-CF)',
      url: 'https://www.ecompetences.eu/',
      bron: {
        pagina: 43,
        sectie: 'bronnenlijst',
      },
    },
    {
      titel: 'Skills Framework for the Information Age (SFIA)',
      url: 'https://www.sfia-online.org/',
      bron: {
        pagina: 43,
        sectie: 'bronnenlijst',
      },
    },
  ],
  afkortingen: [
    {
      term: 'e-CF',
      uitleg: 'European e-Competence Framework',
      bron: {
        pagina: 44,
        sectie: 'afkortingen',
      },
    },
    {
      term: 'SFIA',
      uitleg: 'Skills Framework for the Information Age',
      bron: {
        pagina: 44,
        sectie: 'afkortingen',
      },
    },
  ],
};

export const mockHboiData: HBOIDomeinbeschrijvingCanoniekeDataset = {
  meta: mockMeta,
  beheersingsniveaus: mockBeheersingsniveaus as any,
  activiteiten: mockActiviteiten as any,
  architectuurlagen: mockArchitectuurlagen as any,
  professional_skills: mockProfessionalSkills as any,
  beroepstaken: mockBeroepstaken as any,
  verbanden: mockVerbanden as any,
  raamwerken: mockRaamwerken as any,
  bijlagen: mockBijlagen as any,
};

export const mockSchema = {
  type: 'object',
  properties: {
    meta: { type: 'object' },
    beheersingsniveaus: { type: 'array', minItems: 4 },
    activiteiten: { type: 'array', minItems: 5 },
    architectuurlagen: { type: 'array', minItems: 5 },
    professional_skills: { type: 'object' },
    beroepstaken: { type: 'array' },
    raamwerken: { type: 'object' },
    bijlagen: { type: 'object' },
  },
  required: [
    'meta',
    'beheersingsniveaus',
    'activiteiten',
    'architectuurlagen',
    'professional_skills',
    'beroepstaken',
    'raamwerken',
    'bijlagen',
  ],
};
