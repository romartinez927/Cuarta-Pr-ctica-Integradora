import express, { Router } from "express"
import { productsRouter } from "./products.routes.js"
import { cartsRouter } from "./carts.routes.js"
import { chatRouter } from "./chat.routes.js"
import { deleteSesiones, getCurrentSessionController, postSesiones } from "../controllers/sesiones.controler.js"
import { postUsuarios } from "../controllers/usuarios.controller.js"
import { antenticacionPorGithub_CB, autenticacionPorGithub, autenticacionUserPass } from "../middlewares/passport.js"
import { soloLogueadosApi } from "../middlewares/autentication.js"

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/chat", chatRouter)

apiRouter.get('/sesiones/github', autenticacionPorGithub)
apiRouter.get('/sesiones/githubCallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/') })

apiRouter.post("/usuarios", postUsuarios)
apiRouter.post("/sesiones", autenticacionUserPass, postSesiones)

apiRouter.get('/current', soloLogueadosApi, getCurrentSessionController)

apiRouter.post("/logout", deleteSesiones)

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
