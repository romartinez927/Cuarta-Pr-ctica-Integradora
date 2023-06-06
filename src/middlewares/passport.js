import passport from "passport"
import { Strategy } from "passport-local"
import { validarPassword } from "../utils/crypto.js"
// import { usersModel } from "../dao/mongo/models/users.model.js"
import {Strategy as GithubStrategy} from "passport-github2"
import { clientID, clientSecret, githubCallbackUrl } from "../../config/config.js"
// import { usersModel } from "../dao/mongo/users.dao.mongoose.js"
import { usersRepository } from "../repositories/users.repository.js"
import { usersModel } from "../dao/mongo/users.dao.mongoose.js"

passport.use('local', new Strategy({ usernameField: 'email' }, async (username, password, done) => {
    const usuarioEncontrado = await usersRepository.getUserByEmail(username)
    if (!usuarioEncontrado)
        return done(console.log("error de autenticacion"))
    if (!validarPassword(password, usuarioEncontrado.password))
        return done(console.log("error de autenticacion"))
    delete usuarioEncontrado.password
    done(null, usuarioEncontrado)
}))

passport.use('github', new GithubStrategy({
    clientID,
    clientSecret,
    callbackUrl: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    let user
    try {
        // const search = await usersRepository.findOne({ email: profile.username }).lean()
        const search = await usersRepository.getUserByEmail(username)
        user = search.user
    } catch (error) {
        const newUser = {
            email: profile.username,
            first_name: profile.username,
            last_name: profile.username,
            password: ""
        }
        user = await usersModel.create(newUser)
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