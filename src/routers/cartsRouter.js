import { Router } from "express"

export const cartsRouter = Router()

cartsRouter.get("/", (req, res, next) => { res.json([]) })
cartsRouter.post("/", (req, res, next) => { res.json([]) })
cartsRouter.put("/", (req, res, next) => { res.json([]) })
cartsRouter.delete("/", (req, res, next) => { res.json([]) })
