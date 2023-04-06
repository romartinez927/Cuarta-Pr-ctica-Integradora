import { Router } from "express"
import { Producto } from "../entidades/Producto.js"
import { productosManager } from "../dao/mongo/managers/productos.manager.js"
import mongoose from "mongoose"

export const productsRouter = Router()

productsRouter.get('/', async (req, res, next) => {
    try {
        let limit = req.query.limit
        const productsDb = mongoose.connection.db.collection('products')
        const products = await productsDb.find().toArray()
        if(!limit) return res.json(products)

        products.splice(limit, products.length)
        res.json(products)
    } catch (error) {
        next(error)
    }
})

productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const producto = await productosManager.obtenerSegunId(req.params.pid)
        res.json(producto)
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/', async (req, res, next) => {
    try {
        const producto = new Producto(req.body)
        const productoGuardado = await productosManager.guardar(producto.datos())
        res.json(productoGuardado)
    } catch (error) {
        next(error)
    }
})

productsRouter.put('/:pid', async (req, res, next) => {
    try {
        const producto = new Producto(req.body)
        const productoReemplazado = await productosManager.updateProduct(req.params.pid, producto.datos())
        res.json(productoReemplazado)
        console.log(producto)
    } catch (error) {
        return next(error)  
    }
})

productsRouter.delete('/:pid', async (req, res, next) => {
    try {
        const borrada = await productosManager.borrarSegunId(req.params.pid)
        res.json(borrada)
    } catch (error) {
        next(error)
    }
})