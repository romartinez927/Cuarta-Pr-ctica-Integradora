import { Cart } from "../entidades/Cart.js"
//import { cartsManager } from "../dao/mongo/managers/cart.manager.js"
// import { productosManager } from "../dao/mongo/managers/productos.manager.js"
import { cartsRepository } from "../repositories/carts.repository.js"
import { productosRepository } from "../repositories/products.repository.js"

export async function handleGet(req, res, next) {
    try {
        const carritos = await cartsRepository.obtenerTodos()
        res.json(carritos)
    } catch (error) {
        next(error)
    }
}

export async function handleGetById(req, res, next) {
    try {
        const carrito = await cartsRepository.obtenerSegunId(req.params.cid)
        res.json(carrito)
    } catch (error) {
        next(error)
    }
}

export async function handlePost(req, res, next) {
    try {
        const carrito = new Cart({
            products: []
        })
        const cart = await cartsRepository.create(carrito.datos())
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

export async function handlePostProduct(req, res, next) {
    try {
        const { cid, pid } = req.params
        const product = await productosRepository.obtenerSegunId(pid)
        if (product._id) {
          const cart = await cartsRepository.addProductToCart(pid, cid)
          res.json(cart)
          return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
}

export async function handlePut(req, res, next) {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const newCart = await cartsRepository.updateProduct(cid, pid, quantity)
        res.json(newCart)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function handleDeleteCart(req, res, next) {
    try {
        const { cid } = req.params
        const carrito = await cartsRepository.obtenerSegunId(cid)
        if (carrito) {
            const newCart = await cartsRepository.deleteAllProducts(cid)
            res.json(newCart)
        }
        res.json({ msg: `El carrito con el id ${cid} no existe.` })
    } catch (error) {
        next(error)
    }
}

export async function handleDeleteProduct(req, res, next) {
    try {
        const { cid, pid } = req.params
        const product = await productosManager.obtenerSegunId(pid)
        if (product._id) {
          const cart = await cartsRepository.deleteProductFromCart(pid, cid)
          res.json(cart)
          return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
}