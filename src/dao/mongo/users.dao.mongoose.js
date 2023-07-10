import mongoose from "mongoose";
import { DaoMongoose } from "./DaoMongoose.js";

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    age: { type: Number, require: true },
    email:{ type: String, unique: true, require: true },
    cart:{type: String, unique: true, require: true},
    role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
    password: { type: String, require: true }
}, {versionKey: false})

export const usersModel = mongoose.model(usersCollection, usersSchema)

export const usersDaoMongoose = new DaoMongoose(usersModel)