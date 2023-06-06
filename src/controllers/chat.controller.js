import { Message } from "../models/Message.js"
// import { mensajesManager } from "../dao/mongo/managers/messages.manager.js"
import { io } from "../app/app.js"
import { messagesRepository } from "../repositories/messages.repository.js"

export async function handlePost(req, res, next) {
    try {
        const mensaje = new Message(req.body)
        const message = await messagesRepository.create(mensaje.datos())
        const messages = await messagesRepository.obtenerTodos()
        io.emit("actualizarMensajes", {
            mensajes: messages,
            hayMensajes: messages.length > 0
        })
        res.json(message)
    } catch (error) {
        next(error)
    }
}