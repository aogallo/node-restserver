import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserJwtPayload } from '../types'
//====================================
//  VERIFICACION DE TOKEN
//====================================

export const verificaToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get('token')
  const secretKey = process.env.SEED
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }

  if (!secretKey) {
    return res.status(500).json({
      ok: false,
      message: 'Internal Server Error',
    })
  }

  const decoded = jwt.verify(token, secretKey) as UserJwtPayload

  if (!decoded) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }

  req.user = decoded.user

  next()
}

//====================================
//  VERIFICACION DE ADMINROLE
//====================================

export const verificaAdmin_Role = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  console.log(user)

  if (!user) {
    return res.status(404).json({
      ok: false,
      message: 'Unauthorizated',
    })
  }

  if (user.role != 'ADMIN_ROLE') {
    return res.status(404).json({
      ok: false,
      message: 'Unauthorizated',
    })
  }

  next()
}
