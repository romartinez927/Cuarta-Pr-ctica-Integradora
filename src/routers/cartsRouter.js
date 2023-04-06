import { Router } from "express"
import { Cart } from "../entidades/Cart.js"
import { cartsManager } from "../dao/mongo/managers/cart.manager.js"
import mongoose from "mongoose"
import { productosManager } from "../dao/mongo/managers/productos.manager.js"

export const cartsRouter = Router()

cartsRouter.get('/', async (req, res, next) => {
    try {
        const carritosDb = mongoose.connection.db.collection('carts')
        const carritos = await carritosDb.find().toArray()
        res.json(carritos)
    } catch (error) {
        next(error)
    }
})

cartsRouter.get('/:cid', async (req, res, next) => {
    try {
        const carrito = await cartsManager.obtenerSegunId(req.params.cid)
        res.json(carrito)
    } catch (error) {
        next(error)
    }
})

cartsRouter.post('/', async (req, res, next) => {
    try {
        const carrito = new Cart({
            products: []
        })
        const cart= await cartsManager.guardar(carrito.datos())
        res.json(cart)
    } catch (error) {
        next(error)
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res, next) => {
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

