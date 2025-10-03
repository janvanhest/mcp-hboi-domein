/**
 * HBOI Data Loader Service
 * 
 * Handles loading of HBOI schema and data files from the filesystem.
 * Provides type-safe file operations with proper error handling.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
// DataLoader doesn't need specific types

export interface DataLoaderConfig {
  schemaPath?: string;
  exampleDataPath?: string;
  basePath?: string;
}

export class HboiDataLoader {
  private readonly config: Required<DataLoaderConfig>;

  constructor(config: DataLoaderConfig = {}) {
    this.config = {
      schemaPath: config.schemaPath || 'hboi.schema.json',
      exampleDataPath: config.exampleDataPath || 'hboi.example.json',
      basePath: config.basePath || process.cwd(),
    };
  }

  /**
   * Load the HBOI JSON schema from file
   */
  async loadSchema(): Promise<object> {
    try {
      const schemaPath = resolve(this.config.basePath, this.config.schemaPath);
      console.error(`📋 Loading schema from: ${schemaPath}`);
      
      const schemaContent = readFileSync(schemaPath, 'utf-8');
      const schema = JSON.parse(schemaContent);
      
      console.error(`✅ Schema loaded successfully (${Object.keys(schema.properties || {}).length} sections)`);
      return schema;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to load schema from ${this.config.schemaPath}: ${errorMessage}`);
    }
  }

  /**
   * Load example HBOI data from file
   */
  async loadExampleData(): Promise<unknown> {
    try {
      const dataPath = resolve(this.config.basePath, this.config.exampleDataPath);
      console.error(`📊 Loading example data from: ${dataPath}`);
      
      const dataContent = readFileSync(dataPath, 'utf-8');
      const data = JSON.parse(dataContent);
      
      console.error(`✅ Example data loaded successfully`);
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to load example data from ${this.config.exampleDataPath}: ${errorMessage}`);
    }
  }

  /**
   * Load any JSON file from the filesystem
   */
  async loadFromFile(filePath: string): Promise<unknown> {
    try {
      const fullPath = resolve(this.config.basePath, filePath);
      console.error(`📁 Loading file: ${fullPath}`);
      
      const content = readFileSync(fullPath, 'utf-8');
      const data = JSON.parse(content);
      
      console.error(`✅ File loaded successfully: ${filePath}`);
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to load file ${filePath}: ${errorMessage}`);
    }
  }

  /**
   * Check if required files exist
   */
  async validateFiles(): Promise<{ schema: boolean; exampleData: boolean }> {
    const { readFileSync } = await import('fs');
    
    let schema = false;
    let exampleData = false;

    try {
      const schemaPath = resolve(this.config.basePath, this.config.schemaPath);
      readFileSync(schemaPath, 'utf-8');
      schema = true;
    } catch {
      schema = false;
    }

    try {
      const dataPath = resolve(this.config.basePath, this.config.exampleDataPath);
      readFileSync(dataPath, 'utf-8');
      exampleData = true;
    } catch {
      exampleData = false;
    }

    return { schema, exampleData };
  }

  /**
   * Get configuration
   */
  getConfig(): Required<DataLoaderConfig> {
    return { ...this.config };
  }
}
