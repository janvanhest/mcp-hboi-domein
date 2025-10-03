/**
 * HboiCache Service Tests
 * 
 * Comprehensive tests for in-memory caching functionality
 */

import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals';
import { HboiCache } from '../../services/cache';
import { suppressConsole } from '../utils/testHelpers';

describe('HboiCache', () => {
  let cache: HboiCache;
  let consoleSuppress: { restore: () => void };

  beforeEach(() => {
    cache = new HboiCache({ enableLogging: false });
    consoleSuppress = suppressConsole();
  });

  afterEach(() => {
    consoleSuppress.restore();
  });

  describe('Constructor', () => {
    it('should create cache with default config', () => {
      const defaultCache = new HboiCache();
      expect(defaultCache).toBeInstanceOf(HboiCache);
    });

    it('should create cache with custom TTL', () => {
      const customCache = new HboiCache({ defaultTTL: 1000 });
      expect(customCache).toBeInstanceOf(HboiCache);
    });

    it('should create cache with logging enabled', () => {
      const loggingCache = new HboiCache({ enableLogging: true });
      expect(loggingCache).toBeInstanceOf(HboiCache);
    });
  });

  describe('set() and get()', () => {
    it('should set and get a value', () => {
      cache.set('test-key', { data: 'test-value' });
      const result = cache.get('test-key');
      expect(result).toEqual({ data: 'test-value' });
    });

    it('should return null for non-existent key', () => {
      const result = cache.get('non-existent');
      expect(result).toBeNull();
    });

    it('should handle different data types', () => {
      cache.set('string', 'test');
      cache.set('number', 42);
      cache.set('boolean', true);
      cache.set('object', { key: 'value' });
      cache.set('array', [1, 2, 3]);
      cache.set('null', null);

      expect(cache.get('string')).toBe('test');
      expect(cache.get('number')).toBe(42);
      expect(cache.get('boolean')).toBe(true);
      expect(cache.get('object')).toEqual({ key: 'value' });
      expect(cache.get('array')).toEqual([1, 2, 3]);
      expect(cache.get('null')).toBeNull();
    });

    it('should overwrite existing key', () => {
      cache.set('key', 'value1');
      cache.set('key', 'value2');
      expect(cache.get('key')).toBe('value2');
    });
  });

  describe('TTL (Time To Live)', () => {
    it('should expire entry after TTL', async () => {
      cache.set('expiring-key', 'value', 50); // 50ms TTL
      expect(cache.get('expiring-key')).toBe('value');
      
      await new Promise(resolve => setTimeout(resolve, 60));
      
      expect(cache.get('expiring-key')).toBeNull();
    });

    it('should use default TTL when not specified', () => {
      const customCache = new HboiCache({ defaultTTL: 100 });
      customCache.set('key', 'value');
      
      const stats = customCache.getStats();
      expect(stats.defaultTTL).toBe(100);
    });

    it('should not expire if accessed before TTL', async () => {
      cache.set('key', 'value', 100);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(cache.get('key')).toBe('value');
      
      await new Promise(resolve => setTimeout(resolve, 60)); // Total 110ms > 100ms TTL
      expect(cache.get('key')).toBeNull();
    });
  });

  describe('delete()', () => {
    it('should delete existing key', () => {
      cache.set('key', 'value');
      cache.delete('key');
      expect(cache.get('key')).toBeNull();
    });

    it('should handle deleting non-existent key', () => {
      expect(() => cache.delete('non-existent')).not.toThrow();
    });

    it('should delete multiple different keys', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');
      
      cache.delete('key1');
      cache.delete('key3');
      
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBe('value2');
      expect(cache.get('key3')).toBeNull();
    });
  });

  describe('clear()', () => {
    it('should clear all entries', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');
      
      cache.clear();
      
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
      expect(cache.get('key3')).toBeNull();
    });

    it('should work on empty cache', () => {
      expect(() => cache.clear()).not.toThrow();
    });
  });

  describe('getStats()', () => {
    it('should return cache statistics', () => {
      const stats = cache.getStats();
      
      expect(stats).toHaveProperty('size');
      expect(stats).toHaveProperty('defaultTTL');
      expect(stats).toHaveProperty('maxSize');
      expect(stats).toHaveProperty('hitRate');
      expect(stats).toHaveProperty('entries');
    });

    it('should track cache size', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      
      const stats = cache.getStats();
      expect(stats.size).toBe(2);
    });

    it('should update size after delete', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.delete('key1');
      
      const stats = cache.getStats();
      expect(stats.size).toBe(1);
    });

    it('should show zero size after clear', () => {
      cache.set('key1', 'value1');
      cache.clear();
      
      const stats = cache.getStats();
      expect(stats.size).toBe(0);
    });

    it('should track hit rate', () => {
      cache.set('key', 'value');
      
      cache.get('key'); // hit
      cache.get('key'); // hit
      cache.get('nonexistent'); // miss
      
      const stats = cache.getStats();
      expect(stats.hitRate).toBeCloseTo(0.666, 2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string key', () => {
      cache.set('', 'value');
      expect(cache.get('')).toBe('value');
    });

    it('should handle very long keys', () => {
      const longKey = 'k'.repeat(10000);
      cache.set(longKey, 'value');
      expect(cache.get(longKey)).toBe('value');
    });

    it('should handle special characters in keys', () => {
      const specialKey = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./';
      cache.set(specialKey, 'value');
      expect(cache.get(specialKey)).toBe('value');
    });

    it('should handle large objects', () => {
      const largeObject = {
        data: new Array(1000).fill(0).map((_, i) => ({ id: i, value: `value-${i}` })),
      };
      cache.set('large', largeObject);
      expect(cache.get('large')).toEqual(largeObject);
    });

    it('should handle undefined TTL', () => {
      cache.set('key', 'value', undefined);
      expect(cache.get('key')).toBe('value');
    });

    it('should handle zero TTL as immediate expiry', () => {
      cache.set('key', 'value', 0);
      // Zero TTL means the entry expires immediately
      // Since TTL is 0, any time difference will make it expired
      expect(cache.get('key')).toBeNull();
    });

    it('should handle negative TTL as immediate expiry', async () => {
      cache.set('key', 'value', -1);
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(cache.get('key')).toBeNull();
    });
  });

  describe('Logging', () => {
    it('should log when logging is enabled', () => {
      const logCache = new HboiCache({ enableLogging: true });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      logCache.set('key', 'value');
      logCache.get('key');
      logCache.delete('key');
      logCache.clear();
      
      expect(consoleSpy).toHaveBeenCalledTimes(4);
      consoleSpy.mockRestore();
    });

    it('should not log when logging is disabled', () => {
      const noLogCache = new HboiCache({ enableLogging: false });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      noLogCache.set('key', 'value');
      noLogCache.get('key');
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Max Size Enforcement', () => {
    it('should respect max size limit', () => {
      const limitedCache = new HboiCache({ maxSize: 2 });
      
      limitedCache.set('key1', 'value1');
      limitedCache.set('key2', 'value2');
      limitedCache.set('key3', 'value3'); // Should evict oldest
      
      const stats = limitedCache.getStats();
      expect(stats.size).toBe(2);
      expect(stats.maxSize).toBe(2);
      expect(limitedCache.get('key1')).toBeNull(); // Should be evicted
      expect(limitedCache.get('key3')).toBe('value3'); // Should be present
    });

    it('should track hit rate correctly', () => {
      const cache = new HboiCache();
      
      cache.set('key', 'value');
      cache.get('key'); // hit
      cache.get('key'); // hit
      cache.get('nonexistent'); // miss
      
      const stats = cache.getStats();
      expect(stats.hitRate).toBeCloseTo(0.666, 2);
    });
  });
});

