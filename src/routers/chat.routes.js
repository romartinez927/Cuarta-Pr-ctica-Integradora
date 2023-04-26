import express, { Router } from "express"
import { Message } from "../entidades/Message.js"
import { mensajesManager } from "../dao/mongo/managers/messages.manager.js"
import { io } from "../app.js"

export const chatRouter = Router()

chatRouter.use(express.json())
chatRouter.use(express.urlencoded({ extended: true }))

chatRouter.post("/", async (req, res, next) => {
    try {
        const mensaje = new Message(req.body)
        const message = await mensajesManager.guardar(mensaje.datos())
        const messages = await mensajesManager.obtenerTodos()
        io.emit("actualizarMensajes", {
            mensajes: messages,
            hayMensajes: messages.length > 0
        })
        res.json(message)
    } catch (error) {
        next(error)
    }
})
