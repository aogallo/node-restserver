import express, { Request, Response } from 'express'
const app = express()
import { compareSync } from 'bcrypt'
import { sign, SignOptions } from 'jsonwebtoken'

import { UserModel } from '../models/user'

app.post('/login', async (req: Request, res: Response) => {
  const body = req.body

  const user = UserModel.findOne({ email: body.email })
  if (!user) {
    return res.status(500).json({
      ok: false,
      err: {
        message: 'Invalid credentials',
      },
    })
  }

  if (!compareSync(body.password, user.password)) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Invalid credentials',
      },
    })
  }
  const secretKey = process.env.SEED

  if (!secretKey) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Invalid credentials',
      },
    })
  }

  const expiresIn = parseInt(process.env.CADUCIDAD_TOKEN || '')

  if (!expiresIn) {
    return res.status(500).json({
      ok: false,
    })
  }

  const options: SignOptions = {
    expiresIn,
  }

  //generacion de token
  const token = sign(
    {
      user,
    },
    secretKey,
    options
  )

  res.json({
    ok: true,
    user,
    token,
  })
})

export default app
