import { Router } from "express"
import { handlePost } from "../controllers/chat.controller.js"

export const chatRouter = Router()

chatRouter.post("/", handlePost)
