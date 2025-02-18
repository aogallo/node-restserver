import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, UserJwtPayload } from '../types'
//====================================
//  VERIFICACION DE TOKEN
//====================================

export const verificaToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get('token')
  const secretKey = process.env.SEED

  if (!token) {
    res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
    return
  }

  if (!secretKey) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error',
    })
    return
  }

  const decoded = jwt.verify(token, secretKey) as UserJwtPayload

  if (!decoded) {
    res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
    return
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
    res.status(404).json({
      ok: false,
      message: 'Unauthorizated',
    })
    return
  }

  if (user.role != 'ADMIN_ROLE') {
    res.status(404).json({
      ok: false,
      message: 'Unauthorizated',
    })
    return
  }

  next()
}
