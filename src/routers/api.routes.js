import express, { Router } from "express"

import { productsRouter } from "./products.routes.js"
import { cartsRouter } from "./carts.routes.js"
import { chatRouter } from "./chat.routes.js"
import { sessionRouter } from "./session.routes.js"
import { generateProduct } from "../utils/generateProduct.js"
import { usersRouter } from "./users.routes.js"

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/chat", chatRouter)
apiRouter.use("/mockingproducts", async(req, res) => {
    let users = []
    for (let i = 0; i < 100; i++) {
        users.push(generateProduct())
    }
    res.send({status: "success", payload:users})
})
apiRouter.use("/", sessionRouter)
apiRouter.use("/users", usersRouter)
