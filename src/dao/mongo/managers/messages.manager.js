import mongoose from "mongoose"
import { messageSchema } from "../models/chat.model.js"

class MessagesManager {
    #messagesDb

    constructor() {
        this.#messagesDb = mongoose.model("messages", messageSchema)
    }

    async guardar(mensaje) {
        const mensajeGuardado = await this.#messagesDb.create(mensaje)
        return mensajeGuardado
    }

    async obtenerTodos() {
        const mensajes = await this.#messagesDb.find().lean()
        return mensajes
    }

    async obtenerSegunId(id) {
        const mensaje = await this.#messagesDb.findById(id).lean()
        return mensaje
    }
}

export const mensajesManager = new MessagesManager()