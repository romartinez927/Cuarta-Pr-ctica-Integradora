import { Router } from "express"
import * as cartsController from "../controllers/carts.controller.js"

export const cartsRouter = Router()

// Methods
// obtener carritos
cartsRouter.get('/', cartsController.handleGet)

// obtener carrito por id
cartsRouter.get('/:cid', cartsController.handleGetById)

// crear carrito
cartsRouter.post('/', cartsController.handlePost)

// agregar producto al carrito
cartsRouter.post('/:cid/products/:pid', cartsController.handlePostProduct)

// actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
cartsRouter.put("/:cid/products/:pid", cartsController.handlePut)

// eliminar todos los productos del carrito
cartsRouter.delete("/:cid", cartsController.handleDeleteCart)

// eliminar del carrito el producto seleccionado
cartsRouter.delete("/:cid/products/:pid", cartsController.handleDeleteProduct)

