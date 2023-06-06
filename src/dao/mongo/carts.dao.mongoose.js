import { Schema } from 'mongoose'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const cartCollection = 'carts'

const cartSchema = new Schema({
  products: { 
    type: Array, default: [],
    ref: "products" 
  }
}, {versionKey: false})

export const cartModel = mongoose.model(cartCollection, cartSchema)

export const cartsDaoMongoose = new DaoMongoose(cartModel)