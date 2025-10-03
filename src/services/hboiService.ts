/**
 * HBOI Service
 * 
 * Main service that combines data loading, validation, and caching.
 * Provides a unified interface for HBOI data operations.
 */

import type { HBOIDomeinbeschrijvingCanoniekeDataset } from '../types/hboi.types.ts';
import { HboiDataLoader, type DataLoaderConfig } from './dataLoader.ts';
import { HboiValidator, type ValidationResult } from './validator.ts';
import { HboiCache, type CacheConfig } from './cache.ts';
import { HboiDataService, type HboiDataServiceConfig } from './hboiDataService.ts';

export interface HboiServiceConfig {
  dataLoader?: DataLoaderConfig;
  cache?: CacheConfig;
  dataService?: HboiDataServiceConfig;
  enableCaching?: boolean;
}

export class HboiService {
  private readonly dataLoader: HboiDataLoader;
  private validator: HboiValidator | null = null;
  private readonly cache: HboiCache;
  private readonly dataService: HboiDataService;
  private readonly enableCaching: boolean;
  private isInitialized = false;
  private schema: object | null = null;

  constructor(config: HboiServiceConfig = {}) {
    this.dataLoader = new HboiDataLoader(config.dataLoader);
    this.cache = new HboiCache(config.cache);
    this.dataService = new HboiDataService(config.dataService);
    this.enableCaching = config.enableCaching ?? true;

    // Validator will be initialized after schema is loaded
  }

  /**
   * Initialize the service by loading schema and validating example data
   */
  async initialize(): Promise<void> {
    try {
      console.error('🚀 Initializing HBOI Service...');

      // Check if required files exist
      const fileStatus = await this.dataLoader.validateFiles();
      if (!fileStatus.schema) {
        throw new Error(`Schema file not found: ${this.dataLoader.getConfig().schemaPath}`);
      }
      if (!fileStatus.exampleData) {
        console.error('⚠️  Example data file not found, continuing without it');
      }

      // Load schema
      this.schema = await this.dataLoader.loadSchema();
      this.validator = new HboiValidator(this.schema);

      // Load and validate example data if available
      if (fileStatus.exampleData) {
        const exampleData = await this.dataLoader.loadExampleData();
        const validationResult = this.validator.validateData(exampleData);
        
        if (validationResult.isValid && validationResult.data) {
          // Initialize data service with validated data
          this.dataService.initialize(validationResult.data);
          console.error('✅ Data service initialized with validated data.');
          
          // Cache the validated data
          if (this.enableCaching) {
            this.cache.set('example_data', validationResult.data);
          }
          console.error('✅ Example data loaded and validated successfully');
        } else {
          console.error('⚠️  Example data validation failed:', validationResult.errorMessage);
        }
      }

      this.isInitialized = true;
      console.error('✅ HBOI Service initialized successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to initialize HBOI Service: ${errorMessage}`);
    }
  }

  /**
   * Get validated HBOI data (from cache or load fresh)
   */
  async getData(): Promise<HBOIDomeinbeschrijvingCanoniekeDataset | null> {
    if (!this.isInitialized) {
      throw new Error('HBOI Service not initialized. Call initialize() first.');
    }

    // Try to get from cache first
    if (this.enableCaching) {
        const cachedData = this.cache.get<HBOIDomeinbeschrijvingCanoniekeDataset>('example_data');
      if (cachedData) {
        return cachedData;
      }
    }

    // Load fresh data
    try {
      const rawData = await this.dataLoader.loadExampleData();
      const validationResult = this.validator!.validateData(rawData);
      
      if (validationResult.isValid && validationResult.data) {
        // Cache the validated data
        if (this.enableCaching) {
          this.cache.set('example_data', validationResult.data);
        }
        return validationResult.data;
      } else {
        console.error('Data validation failed:', validationResult.errorMessage);
        return null;
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      return null;
    }
  }

  /**
   * Validate and cache data
   */
  validateAndCache(data: unknown, cacheKey: string = 'custom_data'): ValidationResult {
    if (!this.isInitialized || !this.validator) {
      throw new Error('HBOI Service not initialized. Call initialize() first.');
    }

    const result = this.validator!.validateData(data);
    
    if (result.isValid && result.data && this.enableCaching) {
      this.cache.set(cacheKey, result.data);
    }

    return result;
  }

  /**
   * Get specific section of HBOI data
   */
  async getSection<K extends keyof HBOIDomeinbeschrijvingCanoniekeDataset>(section: K): Promise<HBOIDomeinbeschrijvingCanoniekeDataset[K] | null> {
    const data = await this.getData();
    if (!data) {
      return null;
    }

    return data[section] || null;
  }

  /**
   * Search in HBOI data
   */
  async search(query: string, section?: keyof HBOIDomeinbeschrijvingCanoniekeDataset): Promise<unknown[]> {
    const data = await this.getData();
    if (!data) {
      return [];
    }

    const searchData = section ? data[section] : data;
    return this.performSearch(searchData, query);
  }

  /**
   * Get schema information
   */
  getSchemaInfo(): { title: string; version: string; sections: string[] } | null {
    if (!this.validator) {
      return null;
    }
    return this.validator.getSchemaInfo();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cache.getStats();
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Check if service is initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get the validator instance
   */
  getValidator(): HboiValidator | null {
    return this.validator || null;
  }

  /**
   * Get the data loader instance
   */
  getDataLoader(): HboiDataLoader {
    return this.dataLoader;
  }

  /**
   * Perform search in data (simple string matching)
   */
  private performSearch(data: unknown, query: string): unknown[] {
    const results: unknown[] = [];
    const searchTerm = query.toLowerCase();

    if (Array.isArray(data)) {
      for (const item of data) {
        if (this.matchesSearch(item, searchTerm)) {
          results.push(item);
        }
      }
    } else if (typeof data === 'object' && data !== null) {
      for (const [key, value] of Object.entries(data)) {
        if (key.toLowerCase().includes(searchTerm) || this.matchesSearch(value, searchTerm)) {
          results.push({ key, value });
        }
      }
    }

    return results;
  }

  /**
   * Check if an object matches search criteria
   */
  private matchesSearch(obj: unknown, searchTerm: string): boolean {
    if (typeof obj === 'string') {
      return obj.toLowerCase().includes(searchTerm);
    } else if (typeof obj === 'object' && obj !== null) {
      const str = JSON.stringify(obj).toLowerCase();
      return str.includes(searchTerm);
    }
    return false;
  }

  /**
   * Get the data service instance
   */
  getDataService(): HboiDataService {
    return this.dataService;
  }
}
