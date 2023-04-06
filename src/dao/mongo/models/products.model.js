import mongoose from "mongoose"
import { Schema } from "mongoose"

const productsCollection = 'products'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: Array },
}, { versionKey: false })

export const productModel = mongoose.model(productsCollection, productSchema)

export  { productSchema }