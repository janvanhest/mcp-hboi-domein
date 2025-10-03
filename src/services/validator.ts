/**
 * HBOI Validator Service
 * 
 * Provides runtime validation of HBOI data against the JSON schema using Ajv.
 * Ensures type safety and data integrity for all HBOI operations.
 */

import Ajv, { type ValidateFunction, type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import type { HBOIDomeinbeschrijvingCanoniekeDataset } from '../types/hboi.types.js';

export interface ValidationResult {
  isValid: boolean;
  data?: HBOIDomeinbeschrijvingCanoniekeDataset;
  errors?: ErrorObject[];
  errorMessage?: string;
}

export class HboiValidator {
  private readonly ajv: Ajv;
  private readonly schemaValidator: ValidateFunction;
  private readonly schema: object;

  constructor(schema: object) {
    // Initialize Ajv with format support
    this.ajv = new Ajv({ 
      strict: false,
      allErrors: true,
      verbose: true,
      addUsedSchema: false,
    });
    addFormats(this.ajv);

    // Remove $schema reference to avoid compilation issues
    const cleanSchema = { ...schema };
    delete (cleanSchema as any).$schema;
    delete (cleanSchema as any).$id;
    
    this.schema = cleanSchema;
    
    // Compile the schema for validation
    try {
      this.schemaValidator = this.ajv.compile(cleanSchema);
      console.error('✅ Schema compiled successfully for validation');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to compile schema: ${errorMessage}`);
    }
  }

  /**
   * Validate data against the HBOI schema
   */
  validateData(data: unknown): ValidationResult {
    try {
      const isValid = this.schemaValidator(data);
      
      if (isValid) {
        return {
          isValid: true,
          data: data as HBOIDomeinbeschrijvingCanoniekeDataset,
        };
      } else {
        const errors = this.schemaValidator.errors || [];
        return {
          isValid: false,
          errors,
          errorMessage: this.formatValidationErrors(errors),
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        isValid: false,
        errorMessage: `Validation error: ${errorMessage}`,
      };
    }
  }

  /**
   * Get detailed validation errors
   */
  getValidationErrors(data: unknown): ErrorObject[] {
    const isValid = this.schemaValidator(data);
    return isValid ? [] : (this.schemaValidator.errors || []);
  }

  /**
   * Check if data is valid without returning the data
   */
  isValid(data: unknown): boolean {
    return this.schemaValidator(data);
  }

  /**
   * Validate specific section of HBOI data
   */
  validateSection(data: unknown, section: keyof HBOIDomeinbeschrijvingCanoniekeDataset): ValidationResult {
    if (typeof data !== 'object' || data === null) {
      return {
        isValid: false,
        errorMessage: 'Data must be an object',
      };
    }

    const sectionData = (data as Record<string, unknown>)[section];
    if (sectionData === undefined) {
      return {
        isValid: false,
        errorMessage: `Section '${section}' not found in data`,
      };
    }

    // For section validation, we create a minimal schema
    const sectionSchema = {
      type: 'object',
      properties: {
        [String(section)]: ((this.schema as Record<string, unknown>).properties as Record<string, unknown>)?.[String(section)] as unknown,
      },
      required: [String(section)],
    };

    const sectionValidator = this.ajv.compile(sectionSchema);
    const isValid = sectionValidator({ [String(section)]: sectionData });

    if (isValid) {
      return {
        isValid: true,
        data: { [String(section)]: sectionData } as unknown as HBOIDomeinbeschrijvingCanoniekeDataset,
      };
    } else {
      return {
        isValid: false,
        errors: sectionValidator.errors || [],
        errorMessage: this.formatValidationErrors(sectionValidator.errors || []),
      };
    }
  }

  /**
   * Format validation errors into a readable string
   */
  private formatValidationErrors(errors: ErrorObject[]): string {
    if (errors.length === 0) {
      return 'No validation errors';
    }

    const errorMessages = errors.map((error, index) => {
      const path = error.instancePath || error.schemaPath || 'root';
      const message = error.message || 'Unknown error';
      return `${index + 1}. ${path}: ${message}`;
    });

    return `Validation failed:\n${errorMessages.join('\n')}`;
  }

  /**
   * Get schema information
   */
  getSchemaInfo(): {
    title: string;
    version: string;
    sections: string[];
  } {
    const schema = this.schema as any;
    return {
      title: schema.title || 'HBOI Schema',
      version: schema.meta?.schema_version || 'unknown',
      sections: Object.keys(schema.properties || {}),
    };
  }

  /**
   * Get the compiled validator function
   */
  getValidator(): ValidateFunction {
    return this.schemaValidator;
  }
}
