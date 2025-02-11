import { UserController } from '../controller/user.controller'

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const {
  verificaToken,
  verificaAdmin_Role,
} = require('../middlewares/autentication')

const userController = new UserController()

app.get('/usuario', verificaToken, function (req, res) {
  let desde = req.query.desde || 0
  desde = Number(desde)

  let limite = req.query.limite || 5
  limite = Number(limite)

  const filtro = {
    estado: true,
  }

  Usuario.find(filtro, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        })
      }

      Usuario.count(filtro, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo,
        })
      })
    })
})

app.post(
  '/user',
  [verificaToken, verificaAdmin_Role],
  userController.createUser
)

app.put('/usuario/:id', verificaToken, function (req, res) {
  const id = req.params.id
  const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        })
      }

      res.json({
        ok: true,
        usuario: usuarioDB,
      })
    }
  )
})

app.delete('/usuario/:id', verificaToken, function (req, res) {
  const id = req.params.id

  Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        })
      }

      if (!usuarioBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario no encontrado',
          },
        })
      }

      res.json({
        ok: true,
        usuario: usuarioBorrado,
      })
    }
  )
})

module.exports = app

