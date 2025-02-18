import { Pool } from 'pg'

export abstract class BaseRepository<T> {
  constructor(
    protected tableName: string,
    protected pool: Pool
  ) {}

  async findOne(id: number): Promise<T | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} where id = $1`,
      [id]
    )
    return result.rows[0] || null
  }

  abstract create(item: T): Promise<T>
  abstract update(id: number, item: T): Promise<T | null>
  abstract delete(id: number): Promise<boolean>

  abstract getById(id: string): Promise<T | null>
}
