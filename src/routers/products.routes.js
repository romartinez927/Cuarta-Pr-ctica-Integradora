import { Router } from "express"
import * as productsController from "../controllers/products.controller.js"
import { isAdmin } from "../middlewares/autentication.js"

export const productsRouter = Router()

// Methods
productsRouter.get('/', productsController.handleGet)

// obtener producto segun su id
productsRouter.get('/:pid', productsController.handleGetById)

// crear nuevo producto
productsRouter.post('/', productsController.handlePost)

// actualizar el producto según su id
productsRouter.put('/:pid', isAdmin, productsController.handlePut)

// eliminar producto según su id
productsRouter.delete('/:pid', isAdmin, productsController.handleDelete)

