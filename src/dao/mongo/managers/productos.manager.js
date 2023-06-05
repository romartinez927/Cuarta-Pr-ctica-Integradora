// import mongoose from "mongoose"
// import { productModel, productSchema } from "../models/products.model.js"

// class ProductosManager {
//     #productsDb

//     constructor() {
//         this.#productsDb = mongoose.model("products", productSchema)
//     }

//     async read(page, limit, category, status, sort) {
//         let options = {
//             page: page || 1,
//             limit: limit || 10
//         }

//         try {
//             if(category) {
//                 const products = await productModel.paginate({ category: category }, options)
//                 return products
//             }

//             if(status) {
//                 const products = await productModel.paginate({ status: status }, options)
//                 return products
//             }

//             if(sort) {
//                 if(sort === "asc") {
//                     options.sort = { price: 1 }
//                     const products = await productModel.paginate({}, options)
// 					return products
//                 }
//                 if(sort === "desc") {
//                     options.sort = { price: -1 }
//                     const products = await productModel.paginate({}, options)
// 					return products
//                 }
//             }

//             const products = await productModel.paginate({}, options)
//             return products
//         } catch (error) {
//             next(error)
//         }
//     }

//     async guardar(datosProductos) {
//         const productoGuardado = await this.#productsDb.create(datosProductos)
//         return productoGuardado
//     }

//     async obtenerTodos() {
//         const productos = await this.#productsDb.find().lean()
//         return productos
//     }

//     async obtenerSegunId(id) {
//         const producto = await this.#productsDb.findById(id).lean()
//         return producto
//     }

//     async borrarSegunId(id) {
//         const producto = await this.obtenerSegunId(id)
//         const productoEliminado = this.#productsDb.deleteOne(producto)
//         return productoEliminado
//     }

//     async updateProduct(productId, product) {
//         const result = await productModel.findByIdAndUpdate(productId, product)
//         return result
//     }
// }

// export const productosManager = new ProductosManager()