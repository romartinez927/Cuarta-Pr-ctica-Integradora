import mongoose from "mongoose"
import { cartModel, cartSchema } from "../models/cart.model.js"

class CartsManager {
    #cartsDb

    constructor() {
        this.#cartsDb = mongoose.model("carts", cartSchema)
    }

    async guardar(carrito) {
        const carritoGuardado = await this.#cartsDb.create(carrito)
        return carritoGuardado
    }

    async obtenerTodos() {
        const carritos = await this.#cartsDb.find().lean()
        return carritos
    }

    async obtenerSegunId(id) {
        const carrito = await this.#cartsDb.findById(id).lean()
        return carrito
    }

    async updateCart(cartId, cart) {
        const result = await cartModel.findByIdAndUpdate(cartId, cart)
        return result
    }

    async addProductToCart(productId, cartId) {
        const cart = await this.obtenerSegunId(cartId)
        const product = cart.products.find((item) => item.product == productId)

        if (product) {
            product.quantity++
        } else {
            let product = { product: productId, quantity: 1 }
            cart.products.push(product)
        }

        await this.updateCart(cartId, cart)
        return cart            
    }
}

export const cartsManager = new CartsManager()