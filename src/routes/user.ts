import { Router } from 'express'
import { UserController } from '../controller/user.controller'

import { verificaToken, verificaAdmin_Role } from '../middlewares/autentication'

const _ = require('underscore')
const Usuario = require('../models/usuario')

const router = Router()
const userController = new UserController()

router.get('/users', verificaToken, userController.getUsers)

router.post(
  '/users',
  [verificaToken, verificaAdmin_Role],
  userController.createUser
)

router.put('/user/:id', verificaToken, userController.updateUserById)

// router.delete('/usuario/:id', verificaToken, function (req, res) {
//   const id = req.params.id
//
//   Usuario.findByIdAndUpdate(
//     id,
//     { estado: false },
//     { new: true },
//     (err, usuarioBorrado) => {
//       if (err) {
//         return res.status(400).json({
//           ok: false,
//           err,
//         })
//       }
//
//       if (!usuarioBorrado) {
//         return res.status(400).json({
//           ok: false,
//           err: {
//             message: 'Usuario no encontrado',
//           },
//         })
//       }
//
//       res.json({
//         ok: true,
//         usuario: usuarioBorrado,
//       })
//     }
//   )
// })

export default router
