import { Pool } from 'pg'
import { IUser } from '../models/user'
import { BaseRepository } from './base.repository'

export class UserRepository extends BaseRepository<IUser> {
  constructor(pool: Pool) {
    super('users', pool)
  }

  async create(user: IUser): Promise<IUser> {
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

  async update(id: number, item: IUser): Promise<IUser | null> {
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
}
