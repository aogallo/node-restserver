import { Request, Response } from 'express'
import { pool } from '../config/config'
import { UserRepository } from '../repositories/user.repository'

export class UserController {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository(pool)
  }

  async createUser(req: Request, res: Response) {
    const body = req.body

    const user = 1
  }
}
