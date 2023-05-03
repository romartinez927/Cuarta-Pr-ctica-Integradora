import { deleteSesiones, getCurrentSessionController, postSesiones } from "../controllers/sesiones.controler.js"
import { postUsuarios } from "../controllers/usuarios.controller.js"
import { antenticacionPorGithub_CB, autenticacionPorGithub, autenticacionUserPass } from "../middlewares/passport.js"
import { alreadyHasSession } from "../middlewares/autentication.js"
import { Router } from "express"

export const sessionRouter = Router()

sessionRouter.post("/usuarios", alreadyHasSession, postUsuarios)
sessionRouter.post("/sesiones", autenticacionUserPass, postSesiones)

sessionRouter.post("/logout", deleteSesiones)

sessionRouter.get('/sesiones/github', autenticacionPorGithub)
sessionRouter.get('/sesiones/githubCallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/') })
