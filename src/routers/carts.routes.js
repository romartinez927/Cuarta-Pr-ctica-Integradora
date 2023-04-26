import { Router } from "express"
import { Cart } from "../entidades/Cart.js"
import { cartsManager } from "../dao/mongo/managers/cart.manager.js"
import mongoose from "mongoose"
import { productosManager } from "../dao/mongo/managers/productos.manager.js"

export const cartsRouter = Router()

// Methods
// obtener carritos
cartsRouter.get('/', async (req, res, next) => {
    try {
        const carritosDb = mongoose.connection.db.collection('carts')
        const carritos = await carritosDb.find().toArray()
        res.json(carritos)
    } catch (error) {
        next(error)
    }
})

// obtener carrito por id
cartsRouter.get('/:cid', async (req, res, next) => {
    try {
        const carrito = await cartsManager.obtenerSegunId(req.params.cid)
        res.json(carrito)
    } catch (error) {
        next(error)
    }
})

// crear carrito
cartsRouter.post('/', async (req, res, next) => {
    try {
        const carrito = new Cart({
            products: []
        })
        const cart = await cartsManager.guardar(carrito.datos())
        res.json(cart)
    } catch (error) {
        next(error)
    }
})

// agregar producto al carrito
cartsRouter.post('/:cid/products/:pid', async (req, res, next) => {
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
})

// actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
cartsRouter.put("/:cid/products/:pid", async (req, res, next) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const newCart = await cartsManager.updateProduct(cid, pid, quantity)
        res.json(newCart)

    } catch (error) {
        res.status(500).send(error.message)
    }
})


// eliminar todos los productos del carrito
cartsRouter.delete("/:cid", async (req, res, next) => {
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
})

// eliminar del carrito el producto seleccionado
cartsRouter.delete("/:cid/products/:pid", async (req, res, next) => {
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
})

