import { encriptar } from "../crypto.js";
import { usersModel } from "../dao/mongo/models/users.model.js";

export async function postUsuarios(req, res) {
    const {email, password, name} = req.body
    const data = {
        email,
        name,
        password: encriptar(password)
    }
    const usuarioCreado = await usersModel.create(data)
    req.session.user = {
        name: usuarioCreado.name,
        email: usuarioCreado.email,
    }

    req.login(usuarioCreado, error => {
        if (error) {
            next(new Error('falló el login!'))
        } else {
            res.status(201).send(req.usuarioCreado)
        }
    })
}