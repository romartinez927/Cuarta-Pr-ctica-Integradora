import mongoose from "mongoose"
import { productModel, productSchema } from "../models/products.model.js"

class ProductosManager {
    #productsDb

    constructor() {
        this.#productsDb = mongoose.model("products", productSchema)
    }

    async guardar(datosProductos) {
        const productoGuardado = await this.#productsDb.create(datosProductos)
        return productoGuardado
    }

    async obtenerTodos() {
        const productos = await this.#productsDb.find().lean()
        return productos
    }

    async obtenerSegunId(id) {
        const producto = await this.#productsDb.findById(id).lean()
        return producto
    }

    async borrarSegunId(id) {
        const producto = await this.obtenerSegunId(id)
        const productoEliminado = this.#productsDb.deleteOne(producto)
        return productoEliminado
    }

    async updateProduct(productId, product) {
        const result = await productModel.findByIdAndUpdate(productId, product)
        return result
    }
}

export const productosManager = new ProductosManager()