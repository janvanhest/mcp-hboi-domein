/**
 * HBOI Cache Service
 * 
 * Provides in-memory caching for HBOI data to improve performance.
 * Supports TTL (Time To Live) and cache invalidation strategies.
 */

// Cache service doesn't need specific types

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number; // Time to live in milliseconds
}

export interface CacheConfig {
  defaultTTL?: number; // Default TTL in milliseconds
  maxSize?: number; // Maximum number of entries
  enableLogging?: boolean;
}

export class HboiCache {
  private readonly cache = new Map<string, CacheEntry<unknown>>();
  private readonly config: Required<CacheConfig>;
  private hits = 0;
  private misses = 0;

  constructor(config: CacheConfig = {}) {
    this.config = {
      defaultTTL: config.defaultTTL || 5 * 60 * 1000, // 5 minutes default
      maxSize: config.maxSize || 100, // 100 entries max
      enableLogging: config.enableLogging || false,
    };
  }

  /**
   * Get data from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.misses++;
      this.log(`Cache miss for key: ${key}`);
      return null;
    }

    // Check if entry has expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.misses++;
      this.log(`Cache entry expired for key: ${key}`);
      return null;
    }

    this.hits++;
    this.log(`Cache hit for key: ${key}`);
    return entry.data as T;
  }

  /**
   * Set data in cache
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl !== undefined ? ttl : this.config.defaultTTL,
    };

    // Check cache size limit (only if adding new key)
    if (this.cache.size >= this.config.maxSize && !this.cache.has(key)) {
      this.evictOldest();
    }

    this.cache.set(key, entry);
    this.log(`Cache set for key: ${key} (TTL: ${entry.ttl}ms)`);
  }

  /**
   * Check if key exists in cache and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry !== undefined && !this.isExpired(entry);
  }

  /**
   * Remove specific key from cache
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.log(`Cache deleted for key: ${key}`);
    }
    return deleted;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.log(`Cache cleared (${size} entries removed)`);
  }

  /**
   * Invalidate cache entries matching a pattern
   */
  invalidate(pattern?: string): number {
    if (!pattern) {
      this.clear();
      return this.cache.size;
    }

    let invalidated = 0;
    const regex = new RegExp(pattern);
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        invalidated++;
      }
    }

    this.log(`Cache invalidated ${invalidated} entries matching pattern: ${pattern}`);
    return invalidated;
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    defaultTTL: number;
    entries: Array<{ key: string; age: number; ttl?: number }>;
  } {
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: Date.now() - entry.timestamp,
      ttl: entry.ttl,
    }));

    const totalRequests = this.hits + this.misses;
    const hitRate = totalRequests > 0 ? this.hits / totalRequests : 0;

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hitRate,
      defaultTTL: this.config.defaultTTL,
      entries,
    };
  }

  /**
   * Check if cache entry is expired
   */
  private isExpired(entry: CacheEntry<unknown>): boolean {
    if (entry.ttl === undefined || entry.ttl === null) {
      return false; // No TTL means never expires
    }
    
    if (entry.ttl <= 0) {
      return true; // Zero or negative TTL means immediate expiry
    }
    
    return Date.now() - entry.timestamp > entry.ttl;
  }

  /**
   * Evict the oldest cache entry
   */
  private evictOldest(): void {
    if (this.cache.size === 0) {
      return;
    }

    // Get the first (oldest) entry from the Map
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
      this.log(`Evicted oldest cache entry: ${firstKey}`);
    }
  }

  /**
   * Log cache operations if logging is enabled
   */
  private log(message: string): void {
    if (this.config.enableLogging) {
      console.error(`[HboiCache] ${message}`);
    }
  }

  /**
   * Get all cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }
}
