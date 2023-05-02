import passport from "passport"
import { Strategy } from "passport-local"
import { validarPassword } from "../crypto.js"
import { usersModel } from "../dao/mongo/models/users.model.js"
import {Strategy as GithubStrategy} from "passport-github2"

passport.use('local', new Strategy({ usernameField: 'email' }, async (username, password, done) => {
    const usuarioEncontrado = await usersModel.findOne({ email: username }).lean()
    if (!usuarioEncontrado)
        return done(console.log("error de autenticacion"))
    if (!validarPassword(password, usuarioEncontrado.password))
        return done(console.log("error de autenticacion"))
    delete usuarioEncontrado.password
    done(null, usuarioEncontrado)
}))

passport.use('github', new GithubStrategy({
    clientID: "Iv1.25f8e2396563cd13",
    clientSecret: "cd4d7879479519311cae15b318ba6c5f347373d6",
    callbackURL: "http://localhost:8080/api/sesiones/githubCallback"
}, async (accessToken, refreshToken, profile, done) => {
    let user
    try {
        user = await usersModel.findOne({ email: profile.username }).lean()
        console.log(user)
        return window.location.href = '/products'
    } catch (error) {
        user = {
            email: profile.username,
            name: profile.username,
            password: ""
        }
        await usersModel.create(user)
    }
    done(null, user)
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })

export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })