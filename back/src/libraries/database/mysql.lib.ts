import { createPool, Pool } from 'mysql2/promise';
import { Logger } from 'utils';
import { MysqlError } from '../../error';
import { DbQueryResult, Sql } from '../../types/index';

export class Mysql {
  private static instance: Mysql;

  private pool: Pool;

  private isListening: boolean;

  // DB 연결
  private constructor() {
    this.pool = createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 30,
      queueLimit: 0,
      supportBigNumbers: true,
      bigNumberStrings: true,
    });

    this.isListening = true;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Mysql();
    }

    return this.instance;
  }

  // DB 쿼리 메소드
  public static async query<T>(sql: Sql, options?: unknown): Promise<DbQueryResult<T>> {
    try {
      const { pool, isListening } = Mysql.getInstance();

      if (!isListening) throw new MysqlError('DB_CLOSED_ERROR', 'DB_CLOSED', 'Tried to query after DB closed');

      const [result] = await pool.query<DbQueryResult<T>>(sql, options);

      return result;
    } catch (error) {
      Logger.error('[DATABASE] error: %o', error);

      if (error instanceof MysqlError) {
        throw new MysqlError('DB_QUERY_ERROR', error.code, error.message);
      }

      if (error instanceof Error) {
        throw new MysqlError('DB_OTHER_ERROR', 'UNHANDLED', error.message);
      }

      // 에러 객체가 아닌 상태로 throw 된 경우
      throw new MysqlError('DB_OTHER_ERROR', 'THIS_IS_BUG', JSON.stringify(error));
    }
  }

  public stop() {
    if (this.pool) {
      this.pool.end();

      Logger.info('[Database] Closed.');
    }
  }
}
