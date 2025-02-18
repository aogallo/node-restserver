import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { IUser } from './schemas/user.schema'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

interface UserJwtPayload extends JwtPayload {
  user: IUser
}

interface CreateRequest<T> extends Request {
  body: T
}

interface SearchQueryRequest<T> extends Request {
  query: T
}

interface AuthRequest extends Request {
  user?: IUser
}
