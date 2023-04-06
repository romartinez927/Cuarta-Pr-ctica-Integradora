import { Schema } from 'mongoose'
import mongoose from 'mongoose'

const messagesCollection = 'messages'

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true }
})

const messageModel = mongoose.model(messagesCollection, messageSchema)

export { messageSchema }