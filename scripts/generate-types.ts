#!/usr/bin/env tsx

/**
 * Generate TypeScript types from HBOI JSON Schema
 */

import { compile } from 'json-schema-to-typescript';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const SCHEMA_FILE = 'hboi.schema.json';
const OUTPUT_DIR = 'src/types';
const OUTPUT_FILE = join(OUTPUT_DIR, 'hboi.types.ts');

async function generateTypes(): Promise<void> {
  try {
    console.log('🔄 Generating TypeScript types from HBOI schema...');

    // Ensure output directory exists
    mkdirSync(OUTPUT_DIR, { recursive: true });

    // Read schema file
    const schemaContent = readFileSync(SCHEMA_FILE, 'utf8');
    const schema = JSON.parse(schemaContent);

    // Generate TypeScript types
    const types = await compile(schema, 'HboiSchema', {
      bannerComment:
        '/* Generated from hboi.schema.json - DO NOT EDIT MANUALLY */',
      style: {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
      },
      additionalProperties: false,
      enableConstEnums: true,
      format: true,
    });

    // Write types to file
    writeFileSync(OUTPUT_FILE, types);

    console.log(`✅ Types generated successfully: ${OUTPUT_FILE}`);
    console.log(
      `📊 Schema contains ${Object.keys(schema.properties || {}).length} main sections`
    );
  } catch (error) {
    console.error('❌ Error generating types:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateTypes();
}

export { generateTypes };
