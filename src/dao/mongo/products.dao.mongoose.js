import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongoosePaginate from "mongoose-paginate-v2"
import { DaoMongoose } from "./DaoMongoose.js"
import { usersModel } from "./users.dao.mongoose.js"

const productsCollection = 'products'

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean },
    owner: {
        type: String,
        default: 'admin',
        validate: {
            validator: async function (value) {
                const user = await usersModel.findOne({ email: value });
                console.log(user)
                return user && user.role === 'premium';
            },
            message: 'Only premium users can be assigned as owner.'
        }
    },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String },
}, { versionKey: false })

productSchema.plugin(mongooseAggregatePaginate)
productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productsCollection, productSchema)

export const productosDaoMongoose = new DaoMongoose(productModel)