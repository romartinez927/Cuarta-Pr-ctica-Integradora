import { autenticacionUserPass, autenticacionPorGithub } from "./passport.js"

export function auth(req, res, next) {
    if (autenticacionUserPass || autenticacionPorGithub) {
        return next()
    } else {
        res.redirect("/register")
    }
}

export function soloLogueadosView(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect('/login')
    next()
}

export function soloLogueadosApi(req, res, next) {
    if (!req.isAuthenticated()) {
        //     console.log('peticion de un usuario sin autenticarse, se lanza error')
        return next(console.log("error"))
    }
    // console.log('peticion de un usuario autenticado! continua el flujo normal del caso de uso')
    next()
}

