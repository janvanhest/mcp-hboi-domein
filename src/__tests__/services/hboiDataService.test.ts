/**
 * HboiDataService Tests
 * 
 * Comprehensive test suite for the HboiDataService covering all methods,
 * edge cases, and error handling scenarios.
 */

import { HboiDataService, type FilterOptions, type SearchOptions } from '../../services/hboiDataService';
import { mockHboiData } from '../fixtures/mockHboiData';
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('HboiDataService', () => {
  let service: HboiDataService;

  beforeEach(() => {
    service = new HboiDataService();
    service.initialize(mockHboiData);
  });

  describe('Constructor and Initialization', () => {
    it('should create service with default config', () => {
      const newService = new HboiDataService();
      expect(newService).toBeInstanceOf(HboiDataService);
    });

    it('should create service with custom config', () => {
      const newService = new HboiDataService({ enableCaching: true, cacheTTL: 300 });
      expect(newService).toBeInstanceOf(HboiDataService);
    });

    it('should initialize with data', () => {
      expect(() => service.initialize(mockHboiData)).not.toThrow();
    });

    it('should throw error when accessing methods before initialization', () => {
      const uninitializedService = new HboiDataService();
      expect(() => uninitializedService.getActiviteiten()).toThrow('HboiDataService not initialized');
    });
  });

  describe('Data Access', () => {
    it('should return complete dataset', () => {
      const data = service.getData();
      expect(data).toEqual(mockHboiData);
    });

    it('should return null when not initialized', () => {
      const uninitializedService = new HboiDataService();
      expect(uninitializedService.getData()).toBeNull();
    });
  });

  describe('Entity Access Methods', () => {
    describe('getActiviteiten', () => {
      it('should return all activiteiten', () => {
        const activiteiten = service.getActiviteiten();
        expect(activiteiten).toHaveLength(5);
        expect(activiteiten[0]).toHaveProperty('id');
        expect(activiteiten[0]).toHaveProperty('naam');
        expect(activiteiten[0]).toHaveProperty('beschrijving');
      });
    });

    describe('getActiviteit', () => {
      it('should return specific activiteit by ID', () => {
        const activiteit = service.getActiviteit('act.analyseren');
        expect(activiteit).toBeDefined();
        expect(activiteit?.id).toBe('act.analyseren');
        expect(activiteit?.naam).toBe('Analyseren');
      });

      it('should return null for non-existent ID', () => {
        const activiteit = service.getActiviteit('act.nonexistent');
        expect(activiteit).toBeNull();
      });
    });

    describe('getArchitectuurlagen', () => {
      it('should return all architectuurlagen', () => {
        const architectuurlagen = service.getArchitectuurlagen();
        expect(architectuurlagen).toHaveLength(5);
        expect(architectuurlagen[0]).toHaveProperty('id');
        expect(architectuurlagen[0]).toHaveProperty('naam');
        expect(architectuurlagen[0]).toHaveProperty('beschrijving');
      });
    });

    describe('getArchitectuurlaag', () => {
      it('should return specific architectuurlaag by ID', () => {
        const architectuurlaag = service.getArchitectuurlaag('arch.software');
        expect(architectuurlaag).toBeDefined();
        expect(architectuurlaag?.id).toBe('arch.software');
        expect(architectuurlaag?.naam).toBe('Software');
      });

      it('should return null for non-existent ID', () => {
        const architectuurlaag = service.getArchitectuurlaag('arch.nonexistent');
        expect(architectuurlaag).toBeNull();
      });
    });

    describe('getBeheersingsniveaus', () => {
      it('should return all beheersingsniveaus', () => {
        const beheersingsniveaus = service.getBeheersingsniveaus();
        expect(beheersingsniveaus).toHaveLength(4);
        expect(beheersingsniveaus[0]).toHaveProperty('id');
        expect(beheersingsniveaus[0]).toHaveProperty('naam');
        expect(beheersingsniveaus[0]).toHaveProperty('criteria');
      });
    });

    describe('getBeheersingsniveau', () => {
      it('should return specific beheersingsniveau by ID', () => {
        const beheersingsniveau = service.getBeheersingsniveau(1);
        expect(beheersingsniveau).toBeDefined();
        expect(beheersingsniveau?.id).toBe(1);
        expect(beheersingsniveau?.naam).toBe('Taakgericht');
      });

      it('should return null for non-existent ID', () => {
        const beheersingsniveau = service.getBeheersingsniveau(999);
        expect(beheersingsniveau).toBeNull();
      });
    });

    describe('getBeroepstaken', () => {
      it('should return all beroepstaken', () => {
        const beroepstaken = service.getBeroepstaken();
        expect(beroepstaken).toHaveLength(6);
        expect(beroepstaken[0]).toHaveProperty('id');
        expect(beroepstaken[0]).toHaveProperty('titel');
        expect(beroepstaken[0]).toHaveProperty('activiteit_id');
      });
    });

    describe('getBeroepstaak', () => {
      it('should return specific beroepstaak by ID', () => {
        const beroepstaak = service.getBeroepstaak('bt.software.analyseren.3');
        expect(beroepstaak).toBeDefined();
        expect(beroepstaak?.id).toBe('bt.software.analyseren.3');
        expect(beroepstaak?.titel).toBe('Requirements-analyse voor softwaresysteem');
      });

      it('should return null for non-existent ID', () => {
        const beroepstaak = service.getBeroepstaak('bt.nonexistent');
        expect(beroepstaak).toBeNull();
      });
    });

    describe('getProfessionalSkills', () => {
      it('should return professional skills data', () => {
        const professionalSkills = service.getProfessionalSkills();
        expect(professionalSkills).toBeDefined();
        expect(professionalSkills).toHaveProperty('aandachtsgebieden');
      });
    });

    describe('getAandachtsgebieden', () => {
      it('should return all aandachtsgebieden', () => {
        const aandachtsgebieden = service.getAandachtsgebieden();
        expect(aandachtsgebieden).toHaveLength(2);
        expect(aandachtsgebieden[0]).toHaveProperty('id');
        expect(aandachtsgebieden[0]).toHaveProperty('naam');
        expect(aandachtsgebieden[0]).toHaveProperty('competenties');
      });
    });

    describe('getAandachtsgebied', () => {
      it('should return specific aandachtsgebied by ID', () => {
        const aandachtsgebied = service.getAandachtsgebied('ps.onderzoekend_vermogen');
        expect(aandachtsgebied).toBeDefined();
        expect(aandachtsgebied?.id).toBe('ps.onderzoekend_vermogen');
        expect(aandachtsgebied?.naam).toBe('Onderzoekend vermogen');
      });

      it('should return null for non-existent ID', () => {
        const aandachtsgebied = service.getAandachtsgebied('ps.nonexistent');
        expect(aandachtsgebied).toBeNull();
      });
    });

    describe('getCompetenties', () => {
      it('should return all competenties', () => {
        const competenties = service.getCompetenties();
        expect(competenties.length).toBeGreaterThan(0);
        expect(competenties[0]).toHaveProperty('id');
        expect(competenties[0]).toHaveProperty('naam');
        expect(competenties[0]).toHaveProperty('beschrijving');
      });
    });

    describe('getCompetentie', () => {
      it('should return specific competentie by ID', () => {
        const competentie = service.getCompetentie('ps.competentie.methodische_probleemaanpak');
        expect(competentie).toBeDefined();
        expect(competentie?.id).toBe('ps.competentie.methodische_probleemaanpak');
        expect(competentie?.naam).toBe('Methodische probleemaanpak');
      });

      it('should return null for non-existent ID', () => {
        const competentie = service.getCompetentie('ps.competentie.nonexistent');
        expect(competentie).toBeNull();
      });
    });

    describe('getVerbanden', () => {
      it('should return verbanden data', () => {
        const verbanden = service.getVerbanden();
        expect(verbanden).toBeDefined();
        expect(verbanden).toHaveProperty('activiteit_naar_professional_skills');
      });
    });
  });

  describe('Hierarchical Queries', () => {
    describe('getCompetenciesForAandachtsgebied', () => {
      it('should return competenties for specific aandachtsgebied', () => {
        const competenties = service.getCompetenciesForAandachtsgebied('ps.onderzoekend_vermogen');
        expect(competenties).toHaveLength(3);
        expect(competenties[0]).toHaveProperty('id');
        expect(competenties[0]).toHaveProperty('naam');
      });

      it('should return empty array for non-existent aandachtsgebied', () => {
        const competenties = service.getCompetenciesForAandachtsgebied('ps.nonexistent');
        expect(competenties).toEqual([]);
      });
    });

    describe('getBeroepstakenForActiviteit', () => {
      it('should return beroepstaken for specific activiteit', () => {
        const beroepstaken = service.getBeroepstakenForActiviteit('act.analyseren');
        expect(beroepstaken).toHaveLength(4);
        expect(beroepstaken[0].activiteit_id).toBe('act.analyseren');
      });

      it('should return empty array for activiteit with no beroepstaken', () => {
        const beroepstaken = service.getBeroepstakenForActiviteit('act.ontwerpen');
        expect(beroepstaken).toEqual([]);
      });
    });

    describe('getBeroepstakenForArchitectuurlaag', () => {
      it('should return beroepstaken for specific architectuurlaag', () => {
        const beroepstaken = service.getBeroepstakenForArchitectuurlaag('arch.software');
        expect(beroepstaken).toHaveLength(5);
        expect(beroepstaken[0].architectuurlaag_id).toBe('arch.software');
      });

      it('should return empty array for architectuurlaag with no beroepstaken', () => {
        const beroepstaken = service.getBeroepstakenForArchitectuurlaag('arch.gebruikersinteractie');
        expect(beroepstaken).toEqual([]);
      });
    });

    describe('getBeroepstakenForBeheersingsniveau', () => {
      it('should return beroepstaken for specific beheersingsniveau', () => {
        const beroepstaken = service.getBeroepstakenForBeheersingsniveau(3);
        expect(beroepstaken).toHaveLength(1);
        expect(beroepstaken[0].beheersingsniveau_id).toBe(3);
      });

      it('should return empty array for beheersingsniveau with no beroepstaken', () => {
        const beroepstaken = service.getBeroepstakenForBeheersingsniveau(5);
        expect(beroepstaken).toEqual([]);
      });
    });
  });

  describe('Relational Queries', () => {
    describe('getCompetenciesForActivity', () => {
      it('should return competenties for specific activiteit', () => {
        const competenties = service.getCompetenciesForActivity('act.analyseren');
        expect(competenties).toHaveLength(3);
        expect(competenties[0]).toHaveProperty('id');
        expect(competenties[0]).toHaveProperty('naam');
      });

      it('should return empty array for activiteit with no verbanden', () => {
        const competenties = service.getCompetenciesForActivity('act.adviseren');
        expect(competenties).toEqual([]);
      });
    });

    describe('getBeroepstakenForActiviteitEnArchitectuurlaag', () => {
      it('should return beroepstaken for specific combination', () => {
        const beroepstaken = service.getBeroepstakenForActiviteitEnArchitectuurlaag(
          'act.analyseren',
          'arch.software'
        );
        expect(beroepstaken).toHaveLength(4);
        expect(beroepstaken[0].activiteit_id).toBe('act.analyseren');
        expect(beroepstaken[0].architectuurlaag_id).toBe('arch.software');
      });

      it('should return empty array for non-existent combination', () => {
        const beroepstaken = service.getBeroepstakenForActiviteitEnArchitectuurlaag(
          'act.ontwerpen',
          'arch.gebruikersinteractie'
        );
        expect(beroepstaken).toEqual([]);
      });
    });

    describe('getBeroepstakenForActiviteitArchitectuurlaagEnBeheersingsniveau', () => {
      it('should return beroepstaken for specific combination', () => {
        const beroepstaken = service.getBeroepstakenForActiviteitArchitectuurlaagEnBeheersingsniveau(
          'act.analyseren',
          'arch.software',
          3
        );
        expect(beroepstaken).toHaveLength(1);
        expect(beroepstaken[0].activiteit_id).toBe('act.analyseren');
        expect(beroepstaken[0].architectuurlaag_id).toBe('arch.software');
        expect(beroepstaken[0].beheersingsniveau_id).toBe(3);
      });

      it('should return empty array for non-existent combination', () => {
        const beroepstaken = service.getBeroepstakenForActiviteitArchitectuurlaagEnBeheersingsniveau(
          'act.adviseren',
          'arch.infrastructuur',
          1
        );
        expect(beroepstaken).toEqual([]);
      });
    });
  });

  describe('Filtering & Search', () => {
    describe('filterBeroepstaken', () => {
      it('should filter by activiteit_id', () => {
        const options: FilterOptions = { activiteit_id: 'act.analyseren' };
        const result = service.filterBeroepstaken(options);
        expect(result).toHaveLength(4);
        expect(result[0].activiteit_id).toBe('act.analyseren');
      });

      it('should filter by architectuurlaag_id', () => {
        const options: FilterOptions = { architectuurlaag_id: 'arch.software' };
        const result = service.filterBeroepstaken(options);
        expect(result).toHaveLength(5);
        expect(result[0].architectuurlaag_id).toBe('arch.software');
      });

      it('should filter by beheersingsniveau_id', () => {
        const options: FilterOptions = { beheersingsniveau_id: 3 };
        const result = service.filterBeroepstaken(options);
        expect(result).toHaveLength(1);
        expect(result[0].beheersingsniveau_id).toBe(3);
      });

      it('should filter by kwaliteitseisen', () => {
        const options: FilterOptions = { kwaliteitseisen: ['security'] };
        const result = service.filterBeroepstaken(options);
        expect(result).toHaveLength(5);
        expect(result[0].kwaliteitseisen).toContain('security');
      });

      it('should combine multiple filters', () => {
        const options: FilterOptions = {
          activiteit_id: 'act.analyseren',
          architectuurlaag_id: 'arch.software',
          beheersingsniveau_id: 3
        };
        const result = service.filterBeroepstaken(options);
        expect(result).toHaveLength(1);
        expect(result[0].activiteit_id).toBe('act.analyseren');
        expect(result[0].architectuurlaag_id).toBe('arch.software');
        expect(result[0].beheersingsniveau_id).toBe(3);
      });

      it('should return empty array when no matches', () => {
        const options: FilterOptions = { activiteit_id: 'act.nonexistent' };
        const result = service.filterBeroepstaken(options);
        expect(result).toEqual([]);
      });
    });

    describe('searchByQualityConcern', () => {
      it('should search across all data', () => {
        const results = service.searchByQualityConcern('analyseren');
        expect(results.length).toBeGreaterThan(0);
      });

      it('should be case insensitive by default', () => {
        const results1 = service.searchByQualityConcern('ANALYSEREN');
        const results2 = service.searchByQualityConcern('analyseren');
        expect(results1.length).toBe(results2.length);
      });

      it('should support case sensitive search', () => {
        const options: SearchOptions = { query: 'Analyseren', caseSensitive: true };
        const results = service.searchByQualityConcern('Analyseren', options);
        expect(results.length).toBeGreaterThan(0);
      });

      it('should return empty array for non-existent query', () => {
        const results = service.searchByQualityConcern('nonexistentquery123');
        expect(results).toEqual([]);
      });
    });

    describe('searchInSection', () => {
      it('should search in activiteiten section', () => {
        const results = service.searchInSection('activiteiten', 'analyseren');
        expect(results.length).toBeGreaterThan(0);
      });

      it('should search in architectuurlagen section', () => {
        const results = service.searchInSection('architectuurlagen', 'software');
        expect(results.length).toBeGreaterThan(0);
      });

      it('should search in beheersingsniveaus section', () => {
        const results = service.searchInSection('beheersingsniveaus', 'taakgericht');
        expect(results.length).toBeGreaterThan(0);
      });

      it('should search in beroepstaken section', () => {
        const results = service.searchInSection('beroepstaken', 'requirements');
        expect(results.length).toBeGreaterThan(0);
      });

      it('should search in professional_skills section', () => {
        const results = service.searchInSection('professional_skills', 'methodische');
        expect(results.length).toBeGreaterThan(0);
      });

      it('should return empty array for invalid section', () => {
        const results = service.searchInSection('invalid_section' as any, 'query');
        expect(results).toEqual([]);
      });
    });
  });

  describe('Alias Resolution', () => {
    describe('resolveAlias', () => {
      it('should resolve activiteit by name', () => {
        const result = service.resolveAlias('Analyseren');
        expect(result).toBe('act.analyseren');
      });

      it('should resolve activiteit by ID', () => {
        const result = service.resolveAlias('act.analyseren');
        expect(result).toBe('act.analyseren');
      });

      it('should resolve architectuurlaag by name', () => {
        const result = service.resolveAlias('Software');
        expect(result).toBe('arch.software');
      });

      it('should resolve architectuurlaag by ID', () => {
        const result = service.resolveAlias('arch.software');
        expect(result).toBe('arch.software');
      });

      it('should resolve beroepstaak by title', () => {
        const result = service.resolveAlias('Requirements-analyse voor softwaresysteem');
        expect(result).toBe('bt.software.analyseren.3');
      });

      it('should resolve beroepstaak by ID', () => {
        const result = service.resolveAlias('bt.software.analyseren.3');
        expect(result).toBe('bt.software.analyseren.3');
      });

      it('should resolve competentie by name', () => {
        const result = service.resolveAlias('Methodische probleemaanpak');
        expect(result).toBe('ps.competentie.methodische_probleemaanpak');
      });

      it('should resolve competentie by ID', () => {
        const result = service.resolveAlias('ps.competentie.methodische_probleemaanpak');
        expect(result).toBe('ps.competentie.methodische_probleemaanpak');
      });

      it('should return null for non-existent alias', () => {
        const result = service.resolveAlias('nonexistent');
        expect(result).toBeNull();
      });

      it('should be case insensitive', () => {
        const result = service.resolveAlias('ANALYSEREN');
        expect(result).toBe('act.analyseren');
      });
    });
  });

  describe('Crosswalks', () => {
    describe('mapActivityToECF', () => {
      it('should return ECF areas for activiteit', () => {
        const ecfAreas = service.mapActivityToECF('act.analyseren');
        expect(ecfAreas).toEqual(['Plan']);
      });

      it('should return empty array for activiteit with no ECF areas', () => {
        const ecfAreas = service.mapActivityToECF('act.nonexistent');
        expect(ecfAreas).toEqual([]);
      });
    });

    describe('mapNiveauToSFIA', () => {
      it('should return SFIA level for beheersingsniveau', () => {
        const sfiaLevel = service.mapNiveauToSFIA(1);
        expect(sfiaLevel).toBe('Level 1 - Follow');
      });

      it('should return null for non-existent beheersingsniveau', () => {
        const sfiaLevel = service.mapNiveauToSFIA(999);
        expect(sfiaLevel).toBeNull();
      });
    });

    describe('getSFIANoteForActiviteit', () => {
      it('should return SFIA note for activiteit', () => {
        const sfiaNote = service.getSFIANoteForActiviteit('act.analyseren');
        expect(sfiaNote).toBe('Analyse en requirements engineering');
      });

      it('should return null for activiteit with no SFIA note', () => {
        const sfiaNote = service.getSFIANoteForActiviteit('act.nonexistent');
        expect(sfiaNote).toBeNull();
      });
    });
  });

  describe('Progression Paths', () => {
    describe('getProgressionPath', () => {
      it('should return progression path for same activiteit and architectuurlaag', () => {
        const path = service.getProgressionPath(
          'act.analyseren', 'arch.software', 1,
          'act.analyseren', 'arch.software', 3
        );
        expect(path).toBeDefined();
        expect(path?.from.beheersingsniveau_id).toBe(1);
        expect(path?.to.beheersingsniveau_id).toBe(3);
        expect(path?.steps).toHaveLength(2);
        expect(path?.steps[0].beheersingsniveau_id).toBe(2);
        expect(path?.steps[1].beheersingsniveau_id).toBe(3);
      });

      it('should return progression path for different activiteit and architectuurlaag', () => {
        const path = service.getProgressionPath(
          'act.analyseren', 'arch.software', 1,
          'act.adviseren', 'arch.infrastructuur', 2
        );
        expect(path).toBeDefined();
        expect(path?.from.activiteit_id).toBe('act.analyseren');
        expect(path?.to.activiteit_id).toBe('act.adviseren');
        expect(path?.steps).toHaveLength(1);
      });

      it('should return null when from beroepstaken not found', () => {
        const path = service.getProgressionPath(
          'act.nonexistent', 'arch.nonexistent', 1,
          'act.analyseren', 'arch.software', 3
        );
        expect(path).toBeNull();
      });

      it('should return null when to beroepstaken not found', () => {
        const path = service.getProgressionPath(
          'act.analyseren', 'arch.software', 1,
          'act.nonexistent', 'arch.nonexistent', 3
        );
        expect(path).toBeNull();
      });
    });
  });

  describe('Utility Methods', () => {
    describe('getStats', () => {
      it('should return service statistics', () => {
        const stats = service.getStats();
        expect(stats).toHaveProperty('totalActiviteiten');
        expect(stats).toHaveProperty('totalArchitectuurlagen');
        expect(stats).toHaveProperty('totalBeheersingsniveaus');
        expect(stats).toHaveProperty('totalBeroepstaken');
        expect(stats).toHaveProperty('totalAandachtsgebieden');
        expect(stats).toHaveProperty('totalCompetenties');
        
        expect(stats.totalActiviteiten).toBe(5);
        expect(stats.totalArchitectuurlagen).toBe(5);
        expect(stats.totalBeheersingsniveaus).toBe(4);
        expect(stats.totalBeroepstaken).toBe(6);
        expect(stats.totalAandachtsgebieden).toBe(2);
        expect(stats.totalCompetenties).toBeGreaterThan(0);
      });
    });
  });
});