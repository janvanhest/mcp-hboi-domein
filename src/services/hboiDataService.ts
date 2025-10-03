/**
 * HboiDataService
 * 
 * Core business logic service for HBOI data operations.
 * Framework-agnostic service that provides comprehensive query methods
 * for accessing and manipulating HBOI domain data.
 * 
 * This service is the heart of the HBOI MCP server, providing:
 * - Entity access methods
 * - Hierarchical queries
 * - Relational queries
 * - Filtering & search
 * - Alias resolution
 * - Crosswalks
 * - Progression paths
 */

import type { 
  HBOIDomeinbeschrijvingCanoniekeDataset
} from '../types/hboi.types.js';

// Extract types from the main interface
type Activiteit = HBOIDomeinbeschrijvingCanoniekeDataset['activiteiten'][0];
type Architectuurlaag = HBOIDomeinbeschrijvingCanoniekeDataset['architectuurlagen'][0];
type Beheersingsniveau = HBOIDomeinbeschrijvingCanoniekeDataset['beheersingsniveaus'][0];
type Beroepstaak = HBOIDomeinbeschrijvingCanoniekeDataset['beroepstaken'][0];
type ProfessionalSkills = HBOIDomeinbeschrijvingCanoniekeDataset['professional_skills'];
type Aandachtsgebied = NonNullable<ProfessionalSkills>['aandachtsgebieden'][0];
type Competentie = Aandachtsgebied['competenties'][0];
type Verbanden = HBOIDomeinbeschrijvingCanoniekeDataset['verbanden'];

export interface HboiDataServiceConfig {
  enableCaching?: boolean;
  cacheTTL?: number;
}

export interface FilterOptions {
  activiteit_id?: string;
  architectuurlaag_id?: string;
  beheersingsniveau_id?: number;
  kwaliteitseisen?: Array<'security' | 'privacy' | 'duurzaamheid' | 'budget' | 'tijd' | 'performance' | 'toegankelijkheid' | 'compliance'>;
  aandachtsgebied_id?: string;
}

export interface SearchOptions {
  query: string;
  section?: keyof HBOIDomeinbeschrijvingCanoniekeDataset;
  caseSensitive?: boolean;
  exactMatch?: boolean;
}

export interface ProgressionPath {
  from: {
    activiteit_id: string;
    architectuurlaag_id: string;
    beheersingsniveau_id: number;
  };
  to: {
    activiteit_id: string;
    architectuurlaag_id: string;
    beheersingsniveau_id: number;
  };
  steps: Array<{
    activiteit_id: string;
    architectuurlaag_id: string;
    beheersingsniveau_id: number;
    description: string;
  }>;
  estimatedDuration: string;
  prerequisites: string[];
}

export class HboiDataService {
  private data: HBOIDomeinbeschrijvingCanoniekeDataset | null = null;

  constructor(_config: HboiDataServiceConfig = {}) {
    // Note: enableCaching and cacheTTL are reserved for future caching implementation
    // Currently not used but kept for future expansion
  }

  /**
   * Initialize the service with HBOI data
   */
  initialize(data: HBOIDomeinbeschrijvingCanoniekeDataset): void {
    this.data = data;
    console.error('✅ HboiDataService initialized with data');
  }

  /**
   * Get the complete HBOI dataset
   */
  getData(): HBOIDomeinbeschrijvingCanoniekeDataset | null {
    return this.data;
  }

  // ============================================================================
  // ENTITY ACCESS METHODS
  // ============================================================================

  /**
   * Get all activiteiten (activities)
   */
  getActiviteiten(): Activiteit[] {
    this.ensureInitialized();
    return this.data!.activiteiten || [];
  }

  /**
   * Get a specific activiteit by ID
   */
  getActiviteit(id: string): Activiteit | null {
    const activiteiten = this.getActiviteiten();
    return activiteiten.find(a => a.id === id) || null;
  }

  /**
   * Get all architectuurlagen (architecture layers)
   */
  getArchitectuurlagen(): Architectuurlaag[] {
    this.ensureInitialized();
    return this.data!.architectuurlagen || [];
  }

  /**
   * Get a specific architectuurlaag by ID
   */
  getArchitectuurlaag(id: string): Architectuurlaag | null {
    const architectuurlagen = this.getArchitectuurlagen();
    return architectuurlagen.find(a => a.id === id) || null;
  }

  /**
   * Get all beheersingsniveaus (proficiency levels)
   */
  getBeheersingsniveaus(): Beheersingsniveau[] {
    this.ensureInitialized();
    return this.data!.beheersingsniveaus || [];
  }

  /**
   * Get a specific beheersingsniveau by ID
   */
  getBeheersingsniveau(id: number): Beheersingsniveau | null {
    const beheersingsniveaus = this.getBeheersingsniveaus();
    return beheersingsniveaus.find(b => b.id === id) || null;
  }

  /**
   * Get all beroepstaken (professional tasks)
   */
  getBeroepstaken(): Beroepstaak[] {
    this.ensureInitialized();
    return this.data!.beroepstaken || [];
  }

  /**
   * Get a specific beroepstaak by ID
   */
  getBeroepstaak(id: string): Beroepstaak | null {
    const beroepstaken = this.getBeroepstaken();
    return beroepstaken.find(b => b.id === id) || null;
  }

  /**
   * Get all professional skills
   */
  getProfessionalSkills(): ProfessionalSkills | null {
    this.ensureInitialized();
    return this.data!.professional_skills || null;
  }

  /**
   * Get all aandachtsgebieden (focus areas)
   */
  getAandachtsgebieden(): Aandachtsgebied[] {
    const professionalSkills = this.getProfessionalSkills();
    return professionalSkills?.aandachtsgebieden || [];
  }

  /**
   * Get a specific aandachtsgebied by ID
   */
  getAandachtsgebied(id: string): Aandachtsgebied | null {
    const aandachtsgebieden = this.getAandachtsgebieden();
    return aandachtsgebieden.find(a => a.id === id) || null;
  }

  /**
   * Get all competenties (competencies)
   */
  getCompetenties(): Competentie[] {
    const aandachtsgebieden = this.getAandachtsgebieden();
    return aandachtsgebieden.flatMap(a => a.competenties || []);
  }

  /**
   * Get a specific competentie by ID
   */
  getCompetentie(id: string): Competentie | null {
    const competenties = this.getCompetenties();
    return competenties.find(c => c.id === id) || null;
  }

  /**
   * Get verbanden (relationships)
   */
  getVerbanden(): Verbanden | null {
    this.ensureInitialized();
    return this.data!.verbanden || null;
  }

  // ============================================================================
  // HIERARCHICAL QUERIES
  // ============================================================================

  /**
   * Get all competenties for a specific aandachtsgebied
   */
  getCompetenciesForAandachtsgebied(aandachtsgebiedId: string): Competentie[] {
    const aandachtsgebied = this.getAandachtsgebied(aandachtsgebiedId);
    return aandachtsgebied?.competenties || [];
  }

  /**
   * Get all beroepstaken for a specific activiteit
   */
  getBeroepstakenForActiviteit(activiteitId: string): Beroepstaak[] {
    const beroepstaken = this.getBeroepstaken();
    return beroepstaken.filter(b => b.activiteit_id === activiteitId);
  }

  /**
   * Get all beroepstaken for a specific architectuurlaag
   */
  getBeroepstakenForArchitectuurlaag(architectuurlaagId: string): Beroepstaak[] {
    const beroepstaken = this.getBeroepstaken();
    return beroepstaken.filter(b => b.architectuurlaag_id === architectuurlaagId);
  }

  /**
   * Get all beroepstaken for a specific beheersingsniveau
   */
  getBeroepstakenForBeheersingsniveau(beheersingsniveauId: number): Beroepstaak[] {
    const beroepstaken = this.getBeroepstaken();
    return beroepstaken.filter(b => b.beheersingsniveau_id === beheersingsniveauId);
  }

  // ============================================================================
  // RELATIONAL QUERIES
  // ============================================================================

  /**
   * Get competenties related to a specific activiteit
   */
  getCompetenciesForActivity(activiteitId: string): Competentie[] {
    const verbanden = this.getVerbanden();
    if (!verbanden?.activiteit_naar_professional_skills) {
      return [];
    }

    const activiteitVerband = verbanden.activiteit_naar_professional_skills.find(
      v => v.activiteit_id === activiteitId
    );

    if (!activiteitVerband) {
      return [];
    }

    return activiteitVerband.competentie_ids
      .map((id: string) => this.getCompetentie(id))
      .filter((c): c is Competentie => c !== null);
  }

  /**
   * Get beroepstaken that combine specific activiteit and architectuurlaag
   */
  getBeroepstakenForActiviteitEnArchitectuurlaag(
    activiteitId: string, 
    architectuurlaagId: string
  ): Beroepstaak[] {
    const beroepstaken = this.getBeroepstaken();
    return beroepstaken.filter(
      b => b.activiteit_id === activiteitId && b.architectuurlaag_id === architectuurlaagId
    );
  }

  /**
   * Get beroepstaken that combine specific activiteit, architectuurlaag and beheersingsniveau
   */
  getBeroepstakenForActiviteitArchitectuurlaagEnBeheersingsniveau(
    activiteitId: string,
    architectuurlaagId: string,
    beheersingsniveauId: number
  ): Beroepstaak[] {
    const beroepstaken = this.getBeroepstaken();
    return beroepstaken.filter(
      b => b.activiteit_id === activiteitId && 
           b.architectuurlaag_id === architectuurlaagId && 
           b.beheersingsniveau_id === beheersingsniveauId
    );
  }

  // ============================================================================
  // FILTERING & SEARCH
  // ============================================================================

  /**
   * Filter beroepstaken based on multiple criteria
   */
  filterBeroepstaken(options: FilterOptions): Beroepstaak[] {
    let beroepstaken = this.getBeroepstaken();

    if (options.activiteit_id) {
      beroepstaken = beroepstaken.filter(b => b.activiteit_id === options.activiteit_id);
    }

    if (options.architectuurlaag_id) {
      beroepstaken = beroepstaken.filter(b => b.architectuurlaag_id === options.architectuurlaag_id);
    }

    if (options.beheersingsniveau_id) {
      beroepstaken = beroepstaken.filter(b => b.beheersingsniveau_id === options.beheersingsniveau_id);
    }

    if (options.kwaliteitseisen && options.kwaliteitseisen.length > 0) {
      beroepstaken = beroepstaken.filter(b => 
        b.kwaliteitseisen && 
        options.kwaliteitseisen!.some(k => b.kwaliteitseisen!.includes(k))
      );
    }

    return beroepstaken;
  }

  /**
   * Search across all HBOI data
   */
  searchByQualityConcern(query: string, options: SearchOptions = { query }): unknown[] {
    const searchQuery = options.caseSensitive ? query : query.toLowerCase();
    const results: unknown[] = [];

    // Search in activiteiten
    const activiteiten = this.getActiviteiten();
    results.push(...this.searchInArray(activiteiten, searchQuery, options.caseSensitive));

    // Search in architectuurlagen
    const architectuurlagen = this.getArchitectuurlagen();
    results.push(...this.searchInArray(architectuurlagen, searchQuery, options.caseSensitive));

    // Search in beheersingsniveaus
    const beheersingsniveaus = this.getBeheersingsniveaus();
    results.push(...this.searchInArray(beheersingsniveaus, searchQuery, options.caseSensitive));

    // Search in beroepstaken
    const beroepstaken = this.getBeroepstaken();
    results.push(...this.searchInArray(beroepstaken, searchQuery, options.caseSensitive));

    // Search in competenties
    const competenties = this.getCompetenties();
    results.push(...this.searchInArray(competenties, searchQuery, options.caseSensitive));

    return results;
  }

  /**
   * Search in a specific section
   */
  searchInSection(section: keyof HBOIDomeinbeschrijvingCanoniekeDataset, query: string): unknown[] {
    const searchQuery = query.toLowerCase();
    
    switch (section) {
      case 'activiteiten':
        return this.searchInArray(this.getActiviteiten(), searchQuery, false);
      case 'architectuurlagen':
        return this.searchInArray(this.getArchitectuurlagen(), searchQuery, false);
      case 'beheersingsniveaus':
        return this.searchInArray(this.getBeheersingsniveaus(), searchQuery, false);
      case 'beroepstaken':
        return this.searchInArray(this.getBeroepstaken(), searchQuery, false);
      case 'professional_skills':
        return this.searchInArray(this.getCompetenties(), searchQuery, false);
      default:
        return [];
    }
  }

  // ============================================================================
  // ALIAS RESOLUTION
  // ============================================================================

  /**
   * Resolve an alias to its canonical ID
   */
  resolveAlias(alias: string): string | null {
    // This would typically use a mapping table or search through all entities
    // For now, we'll implement a simple search-based approach
    
    // Search in activiteiten
    const activiteit = this.getActiviteiten().find(a => 
      a.naam.toLowerCase() === alias.toLowerCase() ||
      a.id === alias
    );
    if (activiteit) return activiteit.id;

    // Search in architectuurlagen
    const architectuurlaag = this.getArchitectuurlagen().find(a => 
      a.naam.toLowerCase() === alias.toLowerCase() ||
      a.id === alias
    );
    if (architectuurlaag) return architectuurlaag.id;

    // Search in beroepstaken
    const beroepstaak = this.getBeroepstaken().find(b => 
      b.titel?.toLowerCase() === alias.toLowerCase() ||
      b.id === alias
    );
    if (beroepstaak) return beroepstaak.id;

    // Search in competenties
    const competentie = this.getCompetenties().find(c => 
      c.naam.toLowerCase() === alias.toLowerCase() ||
      c.id === alias
    );
    if (competentie) return competentie.id;

    return null;
  }

  // ============================================================================
  // CROSSWALKS
  // ============================================================================

  /**
   * Map activiteit to ECF areas
   */
  mapActivityToECF(activiteitId: string): string[] {
    const activiteit = this.getActiviteit(activiteitId);
    return activiteit?.koppelingen?.ecf_areas || [];
  }

  /**
   * Map beheersingsniveau to SFIA level
   */
  mapNiveauToSFIA(beheersingsniveauId: number): string | null {
    const beheersingsniveau = this.getBeheersingsniveau(beheersingsniveauId);
    if (!beheersingsniveau) return null;

    // Simple mapping based on beheersingsniveau ID
    const sfiaMapping: Record<number, string> = {
      1: 'Level 1 - Follow',
      2: 'Level 2 - Assist', 
      3: 'Level 3 - Apply',
      4: 'Level 4 - Enable'
    };

    return sfiaMapping[beheersingsniveauId] || null;
  }

  /**
   * Get SFIA note for activiteit
   */
  getSFIANoteForActiviteit(activiteitId: string): string | null {
    const activiteit = this.getActiviteit(activiteitId);
    return activiteit?.koppelingen?.sfia_note || null;
  }

  // ============================================================================
  // PROGRESSION PATHS
  // ============================================================================

  /**
   * Get progression path between two beroepstaken
   */
  getProgressionPath(
    fromActiviteitId: string,
    fromArchitectuurlaagId: string, 
    fromBeheersingsniveauId: number,
    toActiviteitId: string,
    toArchitectuurlaagId: string,
    toBeheersingsniveauId: number
  ): ProgressionPath | null {
    // This is a simplified implementation
    // In a real scenario, this would use more sophisticated logic
    
    const fromBeroepstaken = this.getBeroepstakenForActiviteitArchitectuurlaagEnBeheersingsniveau(
      fromActiviteitId, fromArchitectuurlaagId, fromBeheersingsniveauId
    );
    
    const toBeroepstaken = this.getBeroepstakenForActiviteitArchitectuurlaagEnBeheersingsniveau(
      toActiviteitId, toArchitectuurlaagId, toBeheersingsniveauId
    );

    if (fromBeroepstaken.length === 0 || toBeroepstaken.length === 0) {
      return null;
    }

    // Simple progression logic
    const steps: ProgressionPath['steps'] = [];
    
    // If same activiteit and architectuurlaag, just increase beheersingsniveau
    if (fromActiviteitId === toActiviteitId && fromArchitectuurlaagId === toArchitectuurlaagId) {
      for (let level = fromBeheersingsniveauId + 1; level <= toBeheersingsniveauId; level++) {
        steps.push({
          activiteit_id: fromActiviteitId,
          architectuurlaag_id: fromArchitectuurlaagId,
          beheersingsniveau_id: level,
          description: `Verhoog beheersingsniveau naar ${level}`
        });
      }
    } else {
      // More complex progression - would need more sophisticated logic
      steps.push({
        activiteit_id: toActiviteitId,
        architectuurlaag_id: toArchitectuurlaagId,
        beheersingsniveau_id: toBeheersingsniveauId,
        description: `Transitie naar ${toActiviteitId} in ${toArchitectuurlaagId}`
      });
    }

    return {
      from: {
        activiteit_id: fromActiviteitId,
        architectuurlaag_id: fromArchitectuurlaagId,
        beheersingsniveau_id: fromBeheersingsniveauId
      },
      to: {
        activiteit_id: toActiviteitId,
        architectuurlaag_id: toArchitectuurlaagId,
        beheersingsniveau_id: toBeheersingsniveauId
      },
      steps,
      estimatedDuration: `${steps.length * 6} maanden`,
      prerequisites: ['Relevante werkervaring', 'Training in nieuwe technologieën']
    };
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Ensure service is initialized
   */
  private ensureInitialized(): void {
    if (!this.data) {
      throw new Error('HboiDataService not initialized. Call initialize() first.');
    }
  }

  /**
   * Search in an array of objects
   */
  private searchInArray<T extends Record<string, unknown>>(
    array: T[], 
    query: string, 
    caseSensitive: boolean = false
  ): T[] {
    const searchQuery = caseSensitive ? query : query.toLowerCase();
    
    return array.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          const searchValue = caseSensitive ? value : value.toLowerCase();
          return searchValue.includes(searchQuery);
        }
        if (Array.isArray(value)) {
          return value.some((v: unknown) => 
            typeof v === 'string' && 
            (caseSensitive ? v : v.toLowerCase()).includes(searchQuery)
          );
        }
        return false;
      });
    });
  }

  /**
   * Get service statistics
   */
  getStats(): {
    totalActiviteiten: number;
    totalArchitectuurlagen: number;
    totalBeheersingsniveaus: number;
    totalBeroepstaken: number;
    totalAandachtsgebieden: number;
    totalCompetenties: number;
  } {
    return {
      totalActiviteiten: this.getActiviteiten().length,
      totalArchitectuurlagen: this.getArchitectuurlagen().length,
      totalBeheersingsniveaus: this.getBeheersingsniveaus().length,
      totalBeroepstaken: this.getBeroepstaken().length,
      totalAandachtsgebieden: this.getAandachtsgebieden().length,
      totalCompetenties: this.getCompetenties().length,
    };
  }
}
