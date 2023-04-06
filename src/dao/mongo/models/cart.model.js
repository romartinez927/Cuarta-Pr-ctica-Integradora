import { Schema } from 'mongoose'
import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new Schema({
  products: { type: Array, default: [] }
})

export const cartModel = mongoose.model(cartCollection, cartSchema)

export { cartSchema }