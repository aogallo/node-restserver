import { Request, Response } from 'express'
import { pool } from '../config/config'
import { UserRepository } from '../repositories/user.repository'
import { User } from '../schemas/user.schema'
import { CreateRequest, SearchQueryRequest } from '../types'
import bcrypt from 'bcrypt'
import { paginationSchema, SearchQuery } from '../schemas/common.schemas'

export class UserController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository(pool)
  }

  async createUser(req: CreateRequest<User>, res: Response) {
    const body = req.body

    const userData = {
      ...body,
      password: bcrypt.hashSync(body.password, 10),
    }

    const user = this.userRepository.create(userData)

    res.status(200).json({ succes: true, data: user })
  }

  getUserById = (req: SearchQueryRequest<SearchQuery>, res: Response) => {
    const { id } = req.params

    const user = this.userRepository.getById(id)

    res.status(200).json({ success: true, data: user })
  }

  getUsers(req: Request, res: Response) {
    const parsedQuery = paginationSchema.safeParse(req.query)
    const { page, limit, sortBy, order } = parsedQuery.success
      ? parsedQuery.data
      : {
          limit: 10,
          page: 1,
          sortBy: '',
          order: '',
        }

    const offset = (page - 1) * limit
    const users = this.userRepository.findAll({
      offset,
      limit,
      sortBy,
      order,
    })

    res.status(200).json({ success: true, data: users })
  }

  updateUserById = (req: Request, res: Response) => {
    const { id } = req.params
    const user = this.userRepository.getById(id)

    if (!user) {
      res.status(404)
      return
    }

    res.status(204)
  }
}
