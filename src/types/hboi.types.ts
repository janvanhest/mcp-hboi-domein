/* Generated from hboi.schema.json - DO NOT EDIT MANUALLY */

export interface HBOIDomeinbeschrijvingCanoniekeDataset {
  meta: {
    schema_version: string;
    dataset_version: string;
    generated_at: string;
    language: string;
    source: {
      title: string;
      publisher: string;
      year: number;
      isbn: string;
      license: string;
      license_url?: string;
      document_url?: string;
    };
  };
  raamwerken: {
    ecf?: {
      areas: ('Plan' | 'Build' | 'Run')[];
      activity_area_mapping: {
        activity_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
        ecf_area: 'Plan' | 'Build' | 'Run';
        notes?: string;
      }[];
    };
    sfia?: {
      levels?: number[];
      notes?: string;
    };
    /**
     * Crosswalk van kwalificaties (AD/B/M) met NLQF/EQF/QF-EHEA en e-CF/SFIA indicaties.
     */
    nlqf_eqf_qf?: {
      qualification:
        | 'Associate degree'
        | 'Bachelor'
        | 'Professional master'
        | 'PhD'
        | 'Basis-educatie'
        | 'MBO1'
        | 'MBO2'
        | 'MBO3'
        | 'MBO4/HAVO'
        | 'VWO';
      nlqf: number;
      eqf: number;
      qf_ehea_cycle?: 'short' | '1' | '2' | '3' | '';
      ecf_dimension3_hint?: string;
      sfia_level_hint?: number;
      hboi_beheersingsniveau_hint?: number;
    }[];
    /**
     * Mapping van HBO-i beheersingsniveaus naar externe raamwerken.
     *
     * @minItems 4
     * @maxItems 4
     */
    beheersingsniveaus_crosswalk?: [
      {
        hboi_niveau: 1 | 2 | 3 | 4;
        nlqf: 5 | 6 | 7 | 8;
        qf_ehea: 'short' | 'first' | 'second' | 'third';
        eqf: 5 | 6 | 7 | 8;
        ecf_proficiency: 'e2' | 'e3' | 'e4' | 'e5';
        sfia_responsibility: 2 | 3 | 4 | 5;
        bron: Bron;
      },
      {
        hboi_niveau: 1 | 2 | 3 | 4;
        nlqf: 5 | 6 | 7 | 8;
        qf_ehea: 'short' | 'first' | 'second' | 'third';
        eqf: 5 | 6 | 7 | 8;
        ecf_proficiency: 'e2' | 'e3' | 'e4' | 'e5';
        sfia_responsibility: 2 | 3 | 4 | 5;
        bron: Bron;
      },
      {
        hboi_niveau: 1 | 2 | 3 | 4;
        nlqf: 5 | 6 | 7 | 8;
        qf_ehea: 'short' | 'first' | 'second' | 'third';
        eqf: 5 | 6 | 7 | 8;
        ecf_proficiency: 'e2' | 'e3' | 'e4' | 'e5';
        sfia_responsibility: 2 | 3 | 4 | 5;
        bron: Bron;
      },
      {
        hboi_niveau: 1 | 2 | 3 | 4;
        nlqf: 5 | 6 | 7 | 8;
        qf_ehea: 'short' | 'first' | 'second' | 'third';
        eqf: 5 | 6 | 7 | 8;
        ecf_proficiency: 'e2' | 'e3' | 'e4' | 'e5';
        sfia_responsibility: 2 | 3 | 4 | 5;
        bron: Bron;
      },
    ];
  };
  /**
   * Vier niveaus met criteria zelfstandigheid/complexiteit/inhoud.
   *
   * @minItems 4
   */
  beheersingsniveaus: [
    {
      id: 1 | 2 | 3 | 4;
      naam: 'Taakgericht' | 'Probleemgericht' | 'Situatiegericht' | 'Professiegericht';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      criteria: {
        zelfstandigheid: string;
        complexiteit_context: string;
        complexiteit_inhoud: string;
      };
    },
    {
      id: 1 | 2 | 3 | 4;
      naam: 'Taakgericht' | 'Probleemgericht' | 'Situatiegericht' | 'Professiegericht';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      criteria: {
        zelfstandigheid: string;
        complexiteit_context: string;
        complexiteit_inhoud: string;
      };
    },
    {
      id: 1 | 2 | 3 | 4;
      naam: 'Taakgericht' | 'Probleemgericht' | 'Situatiegericht' | 'Professiegericht';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      criteria: {
        zelfstandigheid: string;
        complexiteit_context: string;
        complexiteit_inhoud: string;
      };
    },
    {
      id: 1 | 2 | 3 | 4;
      naam: 'Taakgericht' | 'Probleemgericht' | 'Situatiegericht' | 'Professiegericht';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      criteria: {
        zelfstandigheid: string;
        complexiteit_context: string;
        complexiteit_inhoud: string;
      };
    },
    ...{
      id: 1 | 2 | 3 | 4;
      naam: 'Taakgericht' | 'Probleemgericht' | 'Situatiegericht' | 'Professiegericht';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      criteria: {
        zelfstandigheid: string;
        complexiteit_context: string;
        complexiteit_inhoud: string;
      };
    }[],
  ];
  /**
   * Vijf activiteiten gebaseerd op SDLC.
   *
   * @minItems 5
   */
  activiteiten: [
    {
      id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
      naam: 'Analyseren' | 'Adviseren' | 'Ontwerpen' | 'Realiseren' | 'Manage & Control';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      koppelingen?: {
        /**
         * @minItems 1
         */
        ecf_areas?: ['Plan' | 'Build' | 'Run', ...('Plan' | 'Build' | 'Run')[]];
        sfia_note?: string;
        ecf_context?: string;
      };
      /**
       * Kwaliteitsaspecten die van groot belang zijn voor alle activiteiten.
       */
      kwaliteitsaspecten?: ('security' | 'budget' | 'tijd' | 'duurzaamheid')[];
      aliases?: string[];
    },
    {
      id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
      naam: 'Analyseren' | 'Adviseren' | 'Ontwerpen' | 'Realiseren' | 'Manage & Control';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      koppelingen?: {
        /**
         * @minItems 1
         */
        ecf_areas?: ['Plan' | 'Build' | 'Run', ...('Plan' | 'Build' | 'Run')[]];
        sfia_note?: string;
        ecf_context?: string;
      };
      /**
       * Kwaliteitsaspecten die van groot belang zijn voor alle activiteiten.
       */
      kwaliteitsaspecten?: ('security' | 'budget' | 'tijd' | 'duurzaamheid')[];
      aliases?: string[];
    },
    {
      id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
      naam: 'Analyseren' | 'Adviseren' | 'Ontwerpen' | 'Realiseren' | 'Manage & Control';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      koppelingen?: {
        /**
         * @minItems 1
         */
        ecf_areas?: ['Plan' | 'Build' | 'Run', ...('Plan' | 'Build' | 'Run')[]];
        sfia_note?: string;
        ecf_context?: string;
      };
      /**
       * Kwaliteitsaspecten die van groot belang zijn voor alle activiteiten.
       */
      kwaliteitsaspecten?: ('security' | 'budget' | 'tijd' | 'duurzaamheid')[];
      aliases?: string[];
    },
    {
      id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
      naam: 'Analyseren' | 'Adviseren' | 'Ontwerpen' | 'Realiseren' | 'Manage & Control';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      koppelingen?: {
        /**
         * @minItems 1
         */
        ecf_areas?: ['Plan' | 'Build' | 'Run', ...('Plan' | 'Build' | 'Run')[]];
        sfia_note?: string;
        ecf_context?: string;
      };
      /**
       * Kwaliteitsaspecten die van groot belang zijn voor alle activiteiten.
       */
      kwaliteitsaspecten?: ('security' | 'budget' | 'tijd' | 'duurzaamheid')[];
      aliases?: string[];
    },
    {
      id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
      naam: 'Analyseren' | 'Adviseren' | 'Ontwerpen' | 'Realiseren' | 'Manage & Control';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      koppelingen?: {
        /**
         * @minItems 1
         */
        ecf_areas?: ['Plan' | 'Build' | 'Run', ...('Plan' | 'Build' | 'Run')[]];
        sfia_note?: string;
        ecf_context?: string;
      };
      /**
       * Kwaliteitsaspecten die van groot belang zijn voor alle activiteiten.
       */
      kwaliteitsaspecten?: ('security' | 'budget' | 'tijd' | 'duurzaamheid')[];
      aliases?: string[];
    },
    ...{
      id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
      naam: 'Analyseren' | 'Adviseren' | 'Ontwerpen' | 'Realiseren' | 'Manage & Control';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      koppelingen?: {
        /**
         * @minItems 1
         */
        ecf_areas?: ['Plan' | 'Build' | 'Run', ...('Plan' | 'Build' | 'Run')[]];
        sfia_note?: string;
        ecf_context?: string;
      };
      /**
       * Kwaliteitsaspecten die van groot belang zijn voor alle activiteiten.
       */
      kwaliteitsaspecten?: ('security' | 'budget' | 'tijd' | 'duurzaamheid')[];
      aliases?: string[];
    }[],
  ];
  /**
   * Vijf lagen: gebruikersinteractie, organisatieprocessen, infrastructuur, software, hardware interfacing.
   *
   * @minItems 5
   */
  architectuurlagen: [
    {
      id:
        | 'arch.gebruikersinteractie'
        | 'arch.organisatieprocessen'
        | 'arch.infrastructuur'
        | 'arch.software'
        | 'arch.hardware_interfacing';
      naam: 'Gebruikersinteractie' | 'Organisatieprocessen' | 'Infrastructuur' | 'Software' | 'Hardware interfacing';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      aliases?: string[];
      /**
       * Specifieke beschrijvingen per activiteit en beheersingsniveau binnen deze architectuurlaag.
       */
      activiteit_niveau_beschrijvingen?: {
        activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
        beheersingsniveau_id: 1 | 2 | 3 | 4;
        beschrijving: string;
        beschrijving_canoniek?: string;
        bron?: Bron;
        sub_aspect?: string;
      }[];
    },
    {
      id:
        | 'arch.gebruikersinteractie'
        | 'arch.organisatieprocessen'
        | 'arch.infrastructuur'
        | 'arch.software'
        | 'arch.hardware_interfacing';
      naam: 'Gebruikersinteractie' | 'Organisatieprocessen' | 'Infrastructuur' | 'Software' | 'Hardware interfacing';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      aliases?: string[];
      /**
       * Specifieke beschrijvingen per activiteit en beheersingsniveau binnen deze architectuurlaag.
       */
      activiteit_niveau_beschrijvingen?: {
        activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
        beheersingsniveau_id: 1 | 2 | 3 | 4;
        beschrijving: string;
        beschrijving_canoniek?: string;
        bron?: Bron;
        sub_aspect?: string;
      }[];
    },
    {
      id:
        | 'arch.gebruikersinteractie'
        | 'arch.organisatieprocessen'
        | 'arch.infrastructuur'
        | 'arch.software'
        | 'arch.hardware_interfacing';
      naam: 'Gebruikersinteractie' | 'Organisatieprocessen' | 'Infrastructuur' | 'Software' | 'Hardware interfacing';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      aliases?: string[];
      /**
       * Specifieke beschrijvingen per activiteit en beheersingsniveau binnen deze architectuurlaag.
       */
      activiteit_niveau_beschrijvingen?: {
        activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
        beheersingsniveau_id: 1 | 2 | 3 | 4;
        beschrijving: string;
        beschrijving_canoniek?: string;
        bron?: Bron;
        sub_aspect?: string;
      }[];
    },
    {
      id:
        | 'arch.gebruikersinteractie'
        | 'arch.organisatieprocessen'
        | 'arch.infrastructuur'
        | 'arch.software'
        | 'arch.hardware_interfacing';
      naam: 'Gebruikersinteractie' | 'Organisatieprocessen' | 'Infrastructuur' | 'Software' | 'Hardware interfacing';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      aliases?: string[];
      /**
       * Specifieke beschrijvingen per activiteit en beheersingsniveau binnen deze architectuurlaag.
       */
      activiteit_niveau_beschrijvingen?: {
        activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
        beheersingsniveau_id: 1 | 2 | 3 | 4;
        beschrijving: string;
        beschrijving_canoniek?: string;
        bron?: Bron;
        sub_aspect?: string;
      }[];
    },
    {
      id:
        | 'arch.gebruikersinteractie'
        | 'arch.organisatieprocessen'
        | 'arch.infrastructuur'
        | 'arch.software'
        | 'arch.hardware_interfacing';
      naam: 'Gebruikersinteractie' | 'Organisatieprocessen' | 'Infrastructuur' | 'Software' | 'Hardware interfacing';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      aliases?: string[];
      /**
       * Specifieke beschrijvingen per activiteit en beheersingsniveau binnen deze architectuurlaag.
       */
      activiteit_niveau_beschrijvingen?: {
        activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
        beheersingsniveau_id: 1 | 2 | 3 | 4;
        beschrijving: string;
        beschrijving_canoniek?: string;
        bron?: Bron;
        sub_aspect?: string;
      }[];
    },
    ...{
      id:
        | 'arch.gebruikersinteractie'
        | 'arch.organisatieprocessen'
        | 'arch.infrastructuur'
        | 'arch.software'
        | 'arch.hardware_interfacing';
      naam: 'Gebruikersinteractie' | 'Organisatieprocessen' | 'Infrastructuur' | 'Software' | 'Hardware interfacing';
      beschrijving: string;
      beschrijving_canoniek?: string;
      bron?: Bron;
      aliases?: string[];
      /**
       * Specifieke beschrijvingen per activiteit en beheersingsniveau binnen deze architectuurlaag.
       */
      activiteit_niveau_beschrijvingen?: {
        activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
        beheersingsniveau_id: 1 | 2 | 3 | 4;
        beschrijving: string;
        beschrijving_canoniek?: string;
        bron?: Bron;
        sub_aspect?: string;
      }[];
    }[],
  ];
  professional_skills: {
    /**
     * @minItems 4
     * @maxItems 4
     */
    aandachtsgebieden: [
      {
        id:
          | 'ps.toekomstgericht_organiseren'
          | 'ps.onderzoekend_vermogen'
          | 'ps.persoonlijk_leiderschap'
          | 'ps.doelgericht_interacteren';
        naam:
          | 'Toekomstgericht organiseren'
          | 'Onderzoekend vermogen'
          | 'Persoonlijk leiderschap'
          | 'Doelgericht interacteren';
        beschrijving: string;
        /**
         * @minItems 3
         * @maxItems 3
         */
        competenties: [
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
        ];
      },
      {
        id:
          | 'ps.toekomstgericht_organiseren'
          | 'ps.onderzoekend_vermogen'
          | 'ps.persoonlijk_leiderschap'
          | 'ps.doelgericht_interacteren';
        naam:
          | 'Toekomstgericht organiseren'
          | 'Onderzoekend vermogen'
          | 'Persoonlijk leiderschap'
          | 'Doelgericht interacteren';
        beschrijving: string;
        /**
         * @minItems 3
         * @maxItems 3
         */
        competenties: [
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
        ];
      },
      {
        id:
          | 'ps.toekomstgericht_organiseren'
          | 'ps.onderzoekend_vermogen'
          | 'ps.persoonlijk_leiderschap'
          | 'ps.doelgericht_interacteren';
        naam:
          | 'Toekomstgericht organiseren'
          | 'Onderzoekend vermogen'
          | 'Persoonlijk leiderschap'
          | 'Doelgericht interacteren';
        beschrijving: string;
        /**
         * @minItems 3
         * @maxItems 3
         */
        competenties: [
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
        ];
      },
      {
        id:
          | 'ps.toekomstgericht_organiseren'
          | 'ps.onderzoekend_vermogen'
          | 'ps.persoonlijk_leiderschap'
          | 'ps.doelgericht_interacteren';
        naam:
          | 'Toekomstgericht organiseren'
          | 'Onderzoekend vermogen'
          | 'Persoonlijk leiderschap'
          | 'Doelgericht interacteren';
        beschrijving: string;
        /**
         * @minItems 3
         * @maxItems 3
         */
        competenties: [
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
          {
            id: string;
            naam:
              | 'Organisatorische context'
              | 'Ethiek'
              | 'Procesmanagement'
              | 'Methodische probleemaanpak'
              | 'Onderzoek'
              | 'Oplossing'
              | 'Ondernemend zijn'
              | 'Persoonlijke ontwikkeling'
              | 'Persoonlijke profilering'
              | 'Partners'
              | 'Communicatie'
              | 'Samenwerken';
            beschrijving: string;
          },
        ];
      },
    ];
  };
  /**
   * Exemplarische beroepstaken per laag × activiteit × niveau.
   */
  beroepstaken: {
    id: string;
    titel?: string;
    beschrijving: string;
    activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
    architectuurlaag_id:
      | 'arch.gebruikersinteractie'
      | 'arch.organisatieprocessen'
      | 'arch.infrastructuur'
      | 'arch.software'
      | 'arch.hardware_interfacing';
    beheersingsniveau_id: 1 | 2 | 3 | 4;
    /**
     * Optionele explicitering van quality concerns zoals security, privacy, duurzaamheid, performance.
     */
    kwaliteitseisen?: (
      | 'security'
      | 'privacy'
      | 'duurzaamheid'
      | 'budget'
      | 'tijd'
      | 'performance'
      | 'toegankelijkheid'
      | 'compliance'
    )[];
    voorbeelden?: string[];
    bronverwijzing?: {
      pagina?: number;
      paragraaf?: string;
    };
    role?: 'exemplar' | 'definitief';
  }[];
  verbanden?: {
    /**
     * Optioneel: mapping conform Bijlage 3; per activiteit de relevante competenties.
     */
    activiteit_naar_professional_skills: {
      activiteit_id: 'act.analyseren' | 'act.adviseren' | 'act.ontwerpen' | 'act.realiseren' | 'act.manage_control';
      competentie_ids: string[];
      notities?: string;
    }[];
  };
  /**
   * Machine-leesbare bijlagen uit het document.
   */
  bijlagen: {
    /**
     * Bibliografie en bronnenlijst.
     */
    bronnen?: {
      titel: string;
      url?: string;
      bron: Bron;
    }[];
    /**
     * Lijst van afkortingen en hun uitleg.
     */
    afkortingen?: {
      term: string;
      uitleg: string;
      bron: Bron;
    }[];
  };
}
export interface Bron {
  pagina: number;
  sectie?: string;
  tabel?: string;
  paragraaf?: string;
}
