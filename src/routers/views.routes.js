import express, { Router } from "express"
import mongoose from "mongoose"
import { alreadyHasSession, auth, soloLogueadosView } from "../middlewares/autentication.js"

export const viewsRouter = Router()

viewsRouter.use(express.json())
viewsRouter.use(express.urlencoded({ extended: true }))

viewsRouter.get("/", async (req, res) => {
    res.redirect("/login")
})

viewsRouter.get("/current", auth, async (req, res) => {
    res.render('profile', {
        title: 'Perfil', user: req['user']
    })
})

viewsRouter.get("/login", alreadyHasSession, async (req, res) => {
    res.render("login", {title: "Login"})
})

viewsRouter.get("/register", async (req, res) => {
    res.render("register", {title: "Registro"})
})

viewsRouter.get('/products', auth, soloLogueadosView, async (req, res) => {
    const userName = req.user.first_name
    const carrito = req.user.cart
    console.log(carrito)
    res.render('products', {
        title: "Productos", 
        user: userName || "usuario", 
        cartId: carrito,
        urlToCard: `http://localhost:8080/carts/${carrito}`,
    })
})

viewsRouter.get('/carts/:cid', auth, soloLogueadosView, async (req, res) => {
    res.render('cart', {title: "Carrito"})
})

viewsRouter.get('/chat', auth, soloLogueadosView, async (req, res) => {
    try {
        const mensajesDb = mongoose.connection.db.collection('messages')
        const mensajes = await mensajesDb.find().toArray()
        res.render('chat', {
            mensajes: mensajes,
            hayMensajes: mensajes.length > 0,
            title: 'Chat'
        })
    } catch (error) {
        next(error)
    }
})