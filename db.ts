import mysql, { Pool } from 'mysql2/promise';

export interface DatabaseConfig {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
  port?: number;
  ssl?: any;
}

class DatabaseManager {
  private pool: Pool | null = null;
  private isConnected = false;
  private inMemoryFallback = true;

  // In-Memory Data Store mirroring MySQL schema
  public inMemStore = {
    users: new Map<string, any>(),
    assessments: new Map<string, any>(),
    topicPerformance: new Map<string, any>(),
    userStats: new Map<string, any>(),
    libraryProgress: new Map<string, any>(),
    achievements: new Map<string, any>(),
    learningPaths: new Map<string, any>()
  };

  constructor() {
    this.initializePool();
  }

  private initializePool() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

    if (host && user && database) {
      try {
        this.pool = mysql.createPool({
          host,
          user,
          password,
          database,
          port,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined
        });

        // Test connection asynchronously
        this.pool.getConnection()
          .then((conn) => {
            this.isConnected = true;
            this.inMemoryFallback = false;
            console.log(`[SmartLearn DB] Successfully connected to MySQL database: ${database} on ${host}`);
            conn.release();
          })
          .catch((err) => {
            this.isConnected = false;
            this.inMemoryFallback = true;
            console.warn('[SmartLearn DB] MySQL connection not established, running on secure parameterized in-memory repository:', err.message);
          });
      } catch (err: any) {
        this.inMemoryFallback = true;
        console.warn('[SmartLearn DB] MySQL client initialization notice:', err.message);
      }
    } else {
      this.inMemoryFallback = true;
      console.log('[SmartLearn DB] No MySQL env variables configured (DB_HOST, DB_USER, DB_NAME). Using secure in-memory repository.');
    }
  }

  public isUsingMySQL(): boolean {
    return this.isConnected && !this.inMemoryFallback && this.pool !== null;
  }

  /**
   * Safe parameterized SQL query execution preventing SQL Injection
   */
  public async execute(sql: string, params: any[] = []): Promise<any> {
    if (this.isUsingMySQL() && this.pool) {
      try {
        const [results] = await this.pool.execute(sql, params);
        return results;
      } catch (err: any) {
        console.error('[SmartLearn DB Error] Prepared statement query failed:', err.message);
        throw new Error('Database query execution error');
      }
    }

    // Handled in repository methods for in-memory mode
    return null;
  }

  public getPool(): Pool | null {
    return this.pool;
  }
}

export const dbManager = new DatabaseManager();
