/**
 * Test Helper Utilities
 * 
 * Common utilities for testing HBOI services
 */

import { jest } from '@jest/globals';
import type { HBOIDomeinbeschrijvingCanoniekeDataset } from '../../types/hboi.types';

/**
 * Create a minimal valid HBOI dataset
 */
export function createMinimalHboiData(): HBOIDomeinbeschrijvingCanoniekeDataset {
  return {
    meta: {
      schema_version: '1.0.0',
      dataset_version: 'test-1.0.0',
      generated_at: '2024-01-01T00:00:00Z',
      language: 'nl',
      source: {
        title: 'Test Dataset',
        publisher: 'Test',
        year: 2024,
        isbn: '000-0-00-000000-0',
        license: 'CC BY 4.0',
      },
    },
    beheersingsniveaus: [
      { id: 1, naam: 'Level 1', beschrijving: 'Test', criteria: { zelfstandigheid: 'Test', complexiteit_context: 'Test', inhoud: 'Test' } },
      { id: 2, naam: 'Level 2', beschrijving: 'Test', criteria: { zelfstandigheid: 'Test', complexiteit_context: 'Test', inhoud: 'Test' } },
      { id: 3, naam: 'Level 3', beschrijving: 'Test', criteria: { zelfstandigheid: 'Test', complexiteit_context: 'Test', inhoud: 'Test' } },
      { id: 4, naam: 'Level 4', beschrijving: 'Test', criteria: { zelfstandigheid: 'Test', complexiteit_context: 'Test', inhoud: 'Test' } },
    ] as any,
    activiteiten: [
      { id: 'act.analyseren', naam: 'Analyseren', beschrijving: 'Test' },
      { id: 'act.adviseren', naam: 'Adviseren', beschrijving: 'Test' },
      { id: 'act.ontwerpen', naam: 'Ontwerpen', beschrijving: 'Test' },
      { id: 'act.realiseren', naam: 'Realiseren', beschrijving: 'Test' },
      { id: 'act.manage_control', naam: 'Manage & Control', beschrijving: 'Test' },
    ] as any,
    architectuurlagen: [
      { id: 'arch.gebruikersinteractie', naam: 'UI', beschrijving: 'Test' },
      { id: 'arch.organisatieprocessen', naam: 'BP', beschrijving: 'Test' },
      { id: 'arch.infrastructuur', naam: 'Infra', beschrijving: 'Test' },
      { id: 'arch.software', naam: 'SW', beschrijving: 'Test' },
      { id: 'arch.hardware_interfacing', naam: 'HW', beschrijving: 'Test' },
    ] as any,
    professional_skills: {
      aandachtsgebieden: [
        {
          id: 'ps.test',
          naam: 'Test Skills',
          beschrijving: 'Test',
          competenties: [
            { id: 'ps.comp.test', naam: 'Test Comp', beschrijving: 'Test' },
          ],
        },
      ],
    } as any,
    beroepstaken: [
      {
        id: 'bt.test',
        titel: 'Test Task',
        beschrijving: 'Test',
        activiteit_id: 'act.analyseren',
        architectuurlaag_id: 'arch.software',
        beheersingsniveau_id: 1,
        role: 'exemplar',
      },
    ] as any,
  } as HBOIDomeinbeschrijvingCanoniekeDataset;
}

/**
 * Wait for a promise with timeout
 */
export async function waitFor<T>(
  fn: () => T | Promise<T>,
  timeout = 1000
): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      return await fn();
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  throw new Error(`Timeout waiting for condition after ${timeout}ms`);
}

/**
 * Suppress console output during tests
 */
export function suppressConsole(): { restore: () => void } {
  const originalError = console.error;
  const originalLog = console.log;
  const originalWarn = console.warn;
  
  console.error = jest.fn();
  console.log = jest.fn();
  console.warn = jest.fn();
  
  return {
    restore: () => {
      console.error = originalError;
      console.log = originalLog;
      console.warn = originalWarn;
    },
  };
}

