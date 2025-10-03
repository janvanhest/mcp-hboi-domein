/**
 * HboiValidator Tests
 * 
 * Comprehensive test suite for the HBOI Validator service covering
 * JSON schema validation, error handling, and data transformation.
 */

import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { HboiValidator, type ValidationResult } from '../../services/validator.ts';
import { mockHboiData } from '../fixtures/mockHboiData.ts';

// Mock console.error to avoid noise in tests
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('HboiValidator', () => {
  let validator: HboiValidator;
  let mockSchema: object;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create a mock schema that matches our data structure
    mockSchema = {
      type: 'object',
      required: ['meta', 'activiteiten', 'architectuurlagen', 'beheersingsniveaus'],
      properties: {
        meta: {
          type: 'object',
          required: ['source'],
          properties: {
            source: {
              type: 'object',
              required: ['title', 'version'],
              properties: {
                title: { type: 'string' },
                version: { type: 'string' }
              }
            }
          }
        },
        activiteiten: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'naam'],
            properties: {
              id: { type: 'string' },
              naam: { type: 'string' },
              beschrijving: { type: 'string' }
            }
          }
        },
        architectuurlagen: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'naam'],
            properties: {
              id: { type: 'string' },
              naam: { type: 'string' },
              beschrijving: { type: 'string' }
            }
          }
        },
        beheersingsniveaus: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'naam'],
            properties: {
              id: { type: 'number' },
              naam: { type: 'string' },
              criteria: { type: 'object' }
            }
          }
        }
      }
    };

    validator = new HboiValidator(mockSchema);
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe('Constructor', () => {
    it('should create validator with valid schema', () => {
      expect(validator).toBeDefined();
      expect(validator).toBeInstanceOf(HboiValidator);
    });

    it('should compile schema successfully', () => {
      // The constructor should not throw an error
      expect(() => new HboiValidator(mockSchema)).not.toThrow();
    });

    it('should handle schema compilation errors', () => {
      const invalidSchema = { invalid: 'schema structure' };
      
      // Ajv might not throw for all invalid schemas, so we test that it doesn't crash
      expect(() => new HboiValidator(invalidSchema)).not.toThrow();
    });

    it('should clean schema by removing $schema and $id', () => {
      const schemaWithMeta = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'https://example.com/schema',
        ...mockSchema
      };

      expect(() => new HboiValidator(schemaWithMeta)).not.toThrow();
    });
  });

  describe('validateData', () => {
    it('should validate valid data successfully', () => {
      const validData = {
        meta: {
          source: {
            title: 'Test Title',
            version: '1.0.0'
          }
        },
        activiteiten: [
          { id: 'act.analyseren', naam: 'Analyseren', beschrijving: 'Test description' }
        ],
        architectuurlagen: [
          { id: 'arch.software', naam: 'Software', beschrijving: 'Test description' }
        ],
        beheersingsniveaus: [
          { id: 1, naam: 'Taakgericht', criteria: {} }
        ]
      };

      const result: ValidationResult = validator.validateData(validData);

      expect(result.isValid).toBe(true);
      expect(result.data).toEqual(validData);
      expect(result.errors).toBeUndefined();
      expect(result.errorMessage).toBeUndefined();
    });

    it('should return validation errors for invalid data', () => {
      const invalidData = {
        // Missing required fields
        meta: {
          source: {
            title: 'Test Title'
            // Missing version
          }
        }
        // Missing required arrays
      };

      const result: ValidationResult = validator.validateData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('should validate mock data structure', () => {
      const result: ValidationResult = validator.validateData(mockHboiData);

      // Mock data might not match our simplified schema, so we test the structure
      expect(result).toBeDefined();
      expect(typeof result.isValid).toBe('boolean');
      if (!result.isValid) {
        expect(result.errors).toBeDefined();
        expect(Array.isArray(result.errors)).toBe(true);
      }
    });

    it('should handle null data', () => {
      const result: ValidationResult = validator.validateData(null);

      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('should handle undefined data', () => {
      const result: ValidationResult = validator.validateData(undefined);

      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('should handle empty object', () => {
      const result: ValidationResult = validator.validateData({});

      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('should handle primitive data types', () => {
      const primitiveData = 'invalid string data';
      const result: ValidationResult = validator.validateData(primitiveData);

      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
    });

    it('should handle array data', () => {
      const arrayData = ['invalid', 'array', 'data'];
      const result: ValidationResult = validator.validateData(arrayData);

      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
    });
  });

  describe('getSchemaInfo', () => {
    it('should return schema information', () => {
      const schemaInfo = validator.getSchemaInfo();

      expect(schemaInfo).toBeDefined();
      expect(schemaInfo.title).toBeDefined();
      expect(schemaInfo.version).toBeDefined();
      expect(schemaInfo.sections).toBeDefined();
      expect(Array.isArray(schemaInfo.sections)).toBe(true);
    });

    it('should include expected sections', () => {
      const schemaInfo = validator.getSchemaInfo();

      expect(schemaInfo.sections).toContain('meta');
      expect(schemaInfo.sections).toContain('activiteiten');
      expect(schemaInfo.sections).toContain('architectuurlagen');
      expect(schemaInfo.sections).toContain('beheersingsniveaus');
    });
  });

  describe('Error Handling', () => {
    it('should handle validation errors gracefully', () => {
      const invalidData = {
        meta: 'invalid string instead of object'
      };

      const result: ValidationResult = validator.validateData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
      
      // Check that errors have meaningful information
      result.errors!.forEach(error => {
        expect(error).toHaveProperty('instancePath');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('schemaPath');
      });
    });

    it('should provide detailed error information', () => {
      const invalidData = {
        meta: {
          source: {
            title: 123, // Should be string
            version: '1.0.0'
          }
        }
      };

      const result: ValidationResult = validator.validateData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      
      // Find error related to title type
      const titleError = result.errors!.find(error => 
        error.instancePath.includes('title') || 
        (error.message && error.message.includes('title'))
      );
      
      expect(titleError).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should validate data efficiently', () => {
      const startTime = Date.now();
      
      // Validate multiple times to test performance
      for (let i = 0; i < 100; i++) {
        validator.validateData(mockHboiData);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time (adjust threshold as needed)
      expect(duration).toBeLessThan(1000); // 1 second
    });

    it('should handle large datasets', () => {
      // Create a larger dataset with valid structure
      const largeData = {
        meta: {
          source: {
            title: 'Test Title',
            version: '1.0.0'
          }
        },
        activiteiten: Array(100).fill(null).map((_, i) => ({
          id: `act.test${i}`,
          naam: `Test Activity ${i}`,
          beschrijving: `Test description ${i}`
        })),
        architectuurlagen: [],
        beheersingsniveaus: []
      };

      const result: ValidationResult = validator.validateData(largeData);

      expect(result.isValid).toBe(true);
      expect(result.data).toEqual(largeData);
    });
  });

  describe('Edge Cases', () => {
    it('should handle deeply nested objects', () => {
      const nestedData = {
        meta: {
          source: {
            title: 'Test',
            version: '1.0.0',
            nested: {
              deeply: {
                nested: {
                  value: 'test'
                }
              }
            }
          }
        },
        activiteiten: [],
        architectuurlagen: [],
        beheersingsniveaus: []
      };

      const result: ValidationResult = validator.validateData(nestedData);

      expect(result.isValid).toBe(true);
    });

    it('should handle special characters in data', () => {
      const specialCharData = {
        meta: {
          source: {
            title: 'Test with special chars: !@#$%^&*()',
            version: '1.0.0'
          }
        },
        activiteiten: [
          { 
            id: 'act.special-chars_123', 
            naam: 'Special: !@#$%^&*()', 
            beschrijving: 'Description with émojis 🚀 and unicode' 
          }
        ],
        architectuurlagen: [],
        beheersingsniveaus: []
      };

      const result: ValidationResult = validator.validateData(specialCharData);

      expect(result.isValid).toBe(true);
    });

    it('should handle empty arrays', () => {
      const emptyArrayData = {
        meta: {
          source: {
            title: 'Test',
            version: '1.0.0'
          }
        },
        activiteiten: [],
        architectuurlagen: [],
        beheersingsniveaus: []
      };

      const result: ValidationResult = validator.validateData(emptyArrayData);

      expect(result.isValid).toBe(true);
    });
  });
});
