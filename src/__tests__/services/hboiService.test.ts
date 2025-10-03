/**
 * HboiService Tests
 * 
 * Basic test suite for the HBOI Service covering
 * initialization and basic functionality.
 */

import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { HboiService } from '../../services/hboiService.ts';

// Mock console.error to avoid noise in tests
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('HboiService', () => {
  let hboiService: HboiService;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Create service instance
    hboiService = new HboiService({
      enableCaching: true
    });
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe('Constructor', () => {
    it('should create service with default config', () => {
      const service = new HboiService();
      
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(HboiService);
    });

    it('should create service with custom config', () => {
      const customConfig = {
        enableCaching: false
      };

      const service = new HboiService(customConfig);
      
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(HboiService);
    });
  });

  describe('Basic Functionality', () => {
    it('should be instantiable', () => {
      expect(hboiService).toBeDefined();
      expect(typeof hboiService).toBe('object');
    });

    it('should have required methods', () => {
      expect(typeof hboiService.initialize).toBe('function');
      expect(typeof hboiService.getData).toBe('function');
      expect(typeof hboiService.validateAndCache).toBe('function');
      expect(typeof hboiService.getSection).toBe('function');
      expect(typeof hboiService.search).toBe('function');
    });
  });

  describe('Error Handling', () => {
    it('should handle uninitialized service gracefully', async () => {
      await expect(hboiService.getData()).rejects.toThrow('HBOI Service not initialized');
    });

    it('should handle validation errors gracefully', () => {
      expect(() => hboiService.validateAndCache({})).toThrow('HBOI Service not initialized');
    });
  });

  describe('Service State', () => {
    it('should maintain service state', () => {
      expect(hboiService).toBeDefined();
      expect(hboiService).toBeInstanceOf(HboiService);
    });

    it('should be ready for initialization', () => {
      expect(typeof hboiService.initialize).toBe('function');
    });
  });
});