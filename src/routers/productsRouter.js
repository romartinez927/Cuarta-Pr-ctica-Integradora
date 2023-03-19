import { Router } from "express"
import { FileManager } from "../FileManager.js"
import { Producto } from "../Producto.js"
import { randomUUID } from "crypto"
import handlebars from "express-handlebars"

export const productsRouter = Router()

const productsManager = new FileManager('./database/products.json')

productsRouter.get('/', async (req, res, next) => {
    try {
        let limit = req.query.limit
        const productos = await productsManager.buscar()
        if(!limit) return res.json(productos)

        productos.splice(limit, productos.length)
        res.json(productos)
    } catch (error) {
        next(error)
    }
})

productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const producto = await productsManager.buscarSegunId(req.params.pid)
        res.json(producto)
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/', async (req, res, next) => {
    try {
        const producto = new Producto({
            ...req.body,
            id: randomUUID()
        })
        const agregada = await productsManager.guardar(producto)
        res.json(agregada)
    } catch (error) {
        next(error)
    }
})

productsRouter.put('/:pid', async (req, res, next) => {
    let productoNuevo
    try {
        productoNuevo = new Producto({
            id: req.params.pid,
            ...req.body
        })
    } catch (error) {
        return next(error)  
    }

    try {
        const productoReemplazado = await productsManager.reemplazarFile(req.params.pid, productoNuevo)
        res.json(productoReemplazado)
    } catch (error) {
        next(error)
    }
})

productsRouter.delete('/:pid', async (req, res, next) => {
    try {
        const borrada = await productsManager.borrarSegunId(req.params.pid)
        res.json(borrada)
    } catch (error) {
        next(error)
    }
})