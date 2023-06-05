import { cartModel, cartsDaoMongoose } from '../dao/mongo/carts.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

class CartsRepository extends GenericRepository {
    constructor(dao) { super(dao) }
    // chequear este punto si no funciona
    async updateCart(cartId, cart) {
        const result = await this.dao.updateById(cartId, cart)
        return result
    }
    async addProductToCart(productId, cartId) {
        const cart = await this.dao.getById(cartId)
        const product = cart.products.find((item) => item.product == productId)
        if (product) {
            product.quantity++
        } else {
            let product = { product: productId, quantity: 1 }
            cart.products.push(product)
        }
        this.updateCart(cartId, cart)
        return cart
    }
    async deleteProductFromCart(productId, cartId) {
        const result = await this.dao.deleteProdFromCart(productId, cartId)
        return result
    }

    async deleteAllProducts(cartId) {
        const result = await this.dao.deleteAll(cartId)
        return result
    }

    async updateProduct(cartId, productId, quantity) {
        const result = await this.dao.updateProd(cartId, productId, quantity)
        return result
    }
}

export const cartsRepository = new CartsRepository(cartsDaoMongoose)