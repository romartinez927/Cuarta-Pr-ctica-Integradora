import express, { Router } from "express"
import { productsRouter } from "./productsRouter.js"
import { cartsRouter } from "./cartsRouter.js"

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter)

apiRouter.use((error, req, res, next) => {
    switch (error.message) {
        case 'id no encontrado':
            res.status(404)
            break
        case 'falta un argumento':
            res.status(400)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
})