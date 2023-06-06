import { Router } from "express"
import { handlePost } from "../controllers/chat.controller.js"
import { isUser } from "../middlewares/autentication.js"

export const chatRouter = Router()

chatRouter.post("/", isUser, handlePost)
