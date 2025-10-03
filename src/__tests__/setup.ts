/**
 * Jest Setup File
 * 
 * This file runs after the test framework is installed but before test files execute.
 * It's ideal for adding custom matchers, global hooks, and test utilities.
 */

import { jest, afterEach, beforeEach } from '@jest/globals';

// Global test timeout
jest.setTimeout(10000);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Suppress console output during tests unless explicitly enabled
const originalConsoleError = console.error;
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  // Only suppress if not in debug mode
  if (!process.env.DEBUG_TESTS) {
    console.error = jest.fn();
    console.log = jest.fn();
    console.warn = jest.fn();
  }
});

afterEach(() => {
  // Restore console methods
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
});
