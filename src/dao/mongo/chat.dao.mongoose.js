import { Schema } from 'mongoose'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const messagesCollection = 'messages'

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true }
})

const messageModel = mongoose.model(messagesCollection, messageSchema)

export const messagesDaoMongoose = new DaoMongoose(messageModel)