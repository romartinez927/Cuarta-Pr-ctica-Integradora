import { Cart } from "../entidades/Cart.js"
import { cartsManager } from "../dao/mongo/managers/cart.manager.js"
import { productosManager } from "../dao/mongo/managers/productos.manager.js"

export async function handleGet(req, res, next) {
    try {
        const carritos = await cartsManager.obtenerTodos()
        res.json(carritos)
    } catch (error) {
        next(error)
    }
}

export async function handleGetById(req, res, next) {
    try {
        const carrito = await cartsManager.obtenerSegunIdConPopulate(req.params.cid)
        console.log("carrito")
        console.log(carrito.products[0])
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
        const cart = await cartsManager.guardar(carrito.datos())
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

export async function handlePostProduct(req, res, next) {
    try {
        const { cid, pid } = req.params
        const product = await productosManager.obtenerSegunId(pid)
        if (product._id) {
          const cart = await cartsManager.addProductToCart(pid, cid)
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
        const newCart = await cartsManager.updateProduct(cid, pid, quantity)
        console.log(newCart)
        res.json(newCart)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function handleDeleteCart(req, res, next) {
    try {
        const { cid } = req.params
        const carrito = await cartsManager.obtenerSegunId(cid)
        if (carrito) {
            const newCart = await cartsManager.deleteAllProducts(cid)
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
          const cart = await cartsManager.deleteProductFromCart(pid, cid)
          res.json(cart)
          return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
}