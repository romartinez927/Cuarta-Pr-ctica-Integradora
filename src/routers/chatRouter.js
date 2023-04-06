import express, { Router } from "express"
import { Message } from "../entidades/Message.js"
import { mensajesManager } from "../dao/mongo/managers/messages.manager.js"
import { handleMessageSocket } from "../middleware/socket.js"

export const chatRouter = Router()

chatRouter.use(express.json())
chatRouter.use(express.urlencoded({ extended: true }))

chatRouter.post("/", async (req, res, next) => {
    const mensaje = new Message(req.body)
    const message = await mensajesManager.guardar(mensaje.datos())
    await handleMessageSocket()

    res.json(message)
})
