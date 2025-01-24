import express from "express";
const app = express();
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

import { findOne } from "../models/usuario";

app.post("/login", (req, res) => {
  let body = req.body;

  findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o contraseña incorrectos",
        },
      });
    }

    if (!compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Contraseña incorrecta",
        },
      });
    }

    //generacion de token
    let token = sign(
      {
        usuario: usuarioDB,
      },
      process.env.SEED,
      { expiresIn: process.env.CADUCIDAD_TOKEN },
    );

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  });
});

export default app;

