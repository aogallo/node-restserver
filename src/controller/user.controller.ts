import { Response } from 'express'
import { pool } from '../config/config'
import { UserRepository } from '../repositories/user.repository'
import { User } from '../schemas/user.schema'
import { CreateRequest } from '../types'

export class UserController {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository(pool)
  }

  async createUser(req: CreateRequest<User>, res: Response) {
    const body = req.body

    const user = this.userRepository.create(body)

    return res.status(200).json({ succes: true, data: user })
  }
}
