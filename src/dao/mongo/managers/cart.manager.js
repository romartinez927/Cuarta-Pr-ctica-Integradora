// import mongoose from "mongoose"
// import { cartModel, cartSchema } from "../models/cart.model.js"

// class CartsManager {
//     #cartsDb

//     constructor() {
//         this.#cartsDb = mongoose.model("carts", cartSchema)
//     }

//     async guardar(carrito) {
//         const carritoGuardado = await this.#cartsDb.create(carrito)
//         return carritoGuardado
//     }

//     async obtenerTodos() {
//         const carritos = await this.#cartsDb.find().lean()
//         return carritos
//     }

//     async obtenerSegunId(id) {
//         const carrito = await this.#cartsDb.findById(id).lean()
//         return carrito
//     }

//     async obtenerSegunIdConPopulate(id) {
//         const carrito = await this.#cartsDb.findById(id).lean().populate()
//         return carrito
//     }

//     async updateCart(cartId, cart) {
//         const result = await cartModel.findByIdAndUpdate(cartId, cart)
//         return result
//     }

//     async addProductToCart(productId, cartId) {
//         const cart = await this.obtenerSegunIdConPopulate(cartId)
//         console.log(cart)
//         console.log("----")
//         const product = cart.products.find((item) => item.product == productId)
//         console.log(product)
//         console.log("-")
//         if (product) {
//             product.quantity++
//         } else {
//             let product = { product: productId, quantity: 1 }
//             cart.products.push(product)
//         }
//         console.log(cart)
//         await this.updateCart(cartId, cart)
//         return cart            
//     }

//     async deleteProductFromCart(productId, cartId) {
//         try {
// 			const newCart = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } })
// 			return newCart
// 		} catch (error) {
// 			throw new Error(error)
// 		}
//     }

//     async deleteAllProducts(cartId) {
//         try {
// 			await cartModel.updateOne({ _id: cartId }, { $set: { products: [] } })
// 		} catch (error) {
// 			throw new Error(error)
// 		}
//     }

//     async updateProduct(cartId, productId, quantity) {
// 		try {
// 			await cartModel.updateOne({ _id: cartId, 'products.product': productId }, { $set: { 'products.$.quantity': quantity } })
// 		} catch (error) {
// 			throw new Error(error)
// 		}
//     }
// }

// export const cartsManager = new CartsManager()