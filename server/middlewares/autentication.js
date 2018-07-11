const jwt = require('jsonwebtoken');
//====================================
//  VERIFICACION DE TOKEN
//====================================

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                message: "Token no valido"
            });
        }

        req.usuario = decoded.usuario;

        next();

    });


};

//====================================
//  VERIFICACION DE ADMINROLE
//====================================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;
    console.log(usuario);

    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(404).json({
            ok: false,
            message: "El usuario no es administrador"
        });
    }

    next();

};



module.exports = {
    verificaToken,
    verificaAdmin_Role
};