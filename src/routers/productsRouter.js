import { Router } from "express"
import { Producto } from "../entidades/Producto.js"
import { productosManager } from "../dao/mongo/managers/productos.manager.js"

export const productsRouter = Router()

// Methods
productsRouter.get('/', async (req, res, next) => {
    const { limit, page, category, status, sort } = req.query
    
    try {
        let product = await productosManager.read(page, limit, category, status, sort)

        const productExist = () => {
            if(Boolean(product.docs)) return "success"
            else return "error"
        }
        res.send({
            status: productExist(),
            payload: product.docs,
            totalDocs: product.totalDocs,
            limit: product.limit,
            totalPages: product.totalPages,
            page: product.page,
            pagingCounter: product.pagingCounter,
            hasPrevPage: product.hasPrevPage,
            hasNextPage: product.hasNextPage,
            prevLink: product.prevPage,
            nextLink: product.nextPage
        })
    } catch (error) {
        next(error)
    }
})

// obtener producto segun su id
productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const producto = await productosManager.obtenerSegunId(req.params.pid)
        res.json(producto)
    } catch (error) {
        next(error)
    }
})

// crear nuevo producto
productsRouter.post('/', async (req, res, next) => {
    try {
        const producto = new Producto(req.body)
        const productoGuardado = await productosManager.guardar(producto.datos())
        res.json(productoGuardado)
    } catch (error) {
        next(error)
    }
})

// actualizar el producto según su id
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

// eliminar producto según su id
productsRouter.delete('/:pid', async (req, res, next) => {
    try {
        const borrada = await productosManager.borrarSegunId(req.params.pid)
        res.json(borrada)
    } catch (error) {
        next(error)
    }
})