import { Pool } from 'pg'
import { BaseRepository } from './base.repository'
import { User } from '../schemas/user.schema'

export class UserRepository extends BaseRepository<User> {
  constructor(pool: Pool) {
    super('users', pool)
  }

  async create(user: User): Promise<User> {
    const result = await this.pool.query(
      `INSERT INTO users( firstName, email , password, state, google, role, img)
    VALUES($1, $2, $3, $4, $5,$6, $7)`,
      [
        user.firstName,
        user.email,
        user.password,
        user.state,
        user.google,
        user.role,
        user.img,
      ]
    )

    return result.rows[0]
  }

  async update(id: number, item: User): Promise<User | null> {
    const result = await this.pool.query(
      'UPDATE users SET firstName = $1, state = $2, google = $3, role = $4, img = $5 WHERE id = $6',
      [item.firstName, item.state, item.google, item.role, item.img, id]
    )
    return result.rows[0]
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query('DELETE * FROM users WHERE id = $1', [
      id,
    ])

    return result.rowCount != null && result.rowCount > 0
  }

  async findAll({
    offset,
    limit,
    sortBy = 'createdAt',
    order = 'desc',
  }: {
    offset: number
    limit: number
    sortBy?: string
    order?: string
  }): Promise<User[] | []> {
    const result = await this.pool.query(
      `
      SELECT id, firstName, lastName, state, google, role, img
      FROM users
      ORDER BY ${sortBy} ${order}
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    )

    return result.rows
  }

  async search(
    query: string,
    fields: string[] = ['firstName']
  ): Promise<User[] | []> {
    const searchFields = fields.map((field) => `${field} ILIKE $1`).join(' OR ')

    const result = await this.pool.query(
      `
      SELECT id, firstName, lastName, state, google, role, img
      FROM users
      WHERE ${searchFields}
      `,
      [`%${query}%`]
    )

    return result.rows
  }

  async getById(id: string): Promise<User | null> {
    const result = await this.pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ])

    if (result.rows.length > 0) {
      return null
    }

    return result.rows[0]
  }
}
