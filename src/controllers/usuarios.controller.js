import { encriptar } from "../utils/crypto.js";
import { usersModel } from "../dao/mongo/models/users.model.js";
//import { cartsManager } from "../dao/mongo/managers/cart.manager.js";
import { Cart } from "../entidades/Cart.js";
import { cartsRepository } from "../repositories/carts.repository.js";

export async function postUsuarios(req, res) {
    const {email, password, first_name, last_name, age} = req.body
    const carrito = new Cart({
        products: []
    })
    const cart = await cartsRepository.create(carrito.datos())
    const data = {
        email,
        age,
        first_name,
        last_name,
        cart: cart._id,
        password: encriptar(password)
    }
    const usuarioCreado = await usersModel.create(data)
    req.session.user = {
        first_name: usuarioCreado.first_name,
        last_name: usuarioCreado.last_name,
        role: "user",
        cart: usuarioCreado.cart,
        age: usuarioCreado.age,
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