import mongoose, { Schema } from "mongoose"
import { DaoMongoose } from "./DaoMongoose.js"

const ticketsCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {type: String, required: true},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true}
})

ticketSchema.set("timestamps", {
    createdAt: "purchase_datetime"
})

const ticketModel = mongoose.model(ticketsCollection, ticketSchema)

export const ticketsDaoMongoose = new DaoMongoose(ticketModel)