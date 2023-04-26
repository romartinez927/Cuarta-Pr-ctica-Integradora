import express, { Router } from "express"
import mongoose from "mongoose"

export const viewsRouter = Router()

viewsRouter.use(express.json())
viewsRouter.use(express.urlencoded({ extended: true }))

viewsRouter.get('/products', async (req, res) => {
    res.render('products')
})

viewsRouter.get('/carts/:cid', async (req, res) => {
    res.render('cart')
})

viewsRouter.get("/login", async (req, res) => {
    res.render("login")
})

viewsRouter.get("/register", async (req, res) => {
    res.render("register")
})

viewsRouter.get('/chat', async (req, res) => {
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