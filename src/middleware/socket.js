import { io } from "../main.js"
import { productosManager } from "../dao/mongo/managers/productos.manager.js"
import { mensajesManager } from "../dao/mongo/managers/messages.manager.js"

export async function socketHandle(req, res, next) {
    const products = await productosManager.obtenerTodos()
    io.emit("updateList", {
        list: products,
        showList: products.length > 0
    })
}

export async function handleMessageSocket(req, res, next) {
    const messages = await mensajesManager.obtenerTodos()
    io.emit("messagesList", {
        list: messages,
        showList: messages.length > 0
    })
}