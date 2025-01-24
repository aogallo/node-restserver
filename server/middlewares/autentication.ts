import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
//====================================
//  VERIFICACION DE TOKEN
//====================================

const verificaToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("token");
  const secretKey = process.env.SEED;
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Invalid token",
    });
  }

  if (!secretKey) {
    return res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }

  const decoded = jwt.verify(token, secretKey);

  if (!decoded) {
    return res.status(401).json({
      ok: false,
      message: "Invalid token",
    });
  }

  req.usuario = decoded.usuario;

  next();
};

//====================================
//  VERIFICACION DE ADMINROLE
//====================================

const verificaAdmin_Role = (req, res, next) => {
  const usuario = req.usuario;
  console.log(usuario);

  if (usuario.role != "ADMIN_ROLE") {
    return res.status(404).json({
      ok: false,
      message: "El usuario no es administrador",
    });
  }

  next();
};

module.exports = {
  verificaToken,
  verificaAdmin_Role,
};

