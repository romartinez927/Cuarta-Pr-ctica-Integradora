import { encriptar } from "../utils/crypto.js";
import { Cart } from "../models/Cart.js";
import { cartsRepository } from "../repositories/carts.repository.js";
import { usersRepository } from "../repositories/users.repository.js";

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
    const usuarioCreado = await usersRepository.create(data)
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
            req.logger.info('login success')
            res.status(201).send(req.usuarioCreado)
        }
    })
}