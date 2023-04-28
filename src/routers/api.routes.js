import express, { Router } from "express"
import { productsRouter } from "./products.routes.js"
import { cartsRouter } from "./carts.routes.js"
import { chatRouter } from "./chat.routes.js"
import { deleteSesiones, postSesiones } from "../controllers/sesiones.controler.js"
import { postUsuarios } from "../controllers/usuarios.controller.js"

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/chat", chatRouter)

apiRouter.post("/usuarios", postUsuarios)
apiRouter.post("/sesiones", postSesiones)
apiRouter.delete("/sesiones", deleteSesiones)

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
