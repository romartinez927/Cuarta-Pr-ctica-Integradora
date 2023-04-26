import { Router } from "express";
import { requireNoAuth } from "../middlewares.js";
import { userModel } from "../dao/mongo/models/users.model.js";

export const loginRouter = Router()

loginRouter.get('/', requireNoAuth, (req, res) => {
    res.render('login', { title: 'Login' })
})

loginRouter.post('/', requireNoAuth, async (req, res) => {
    const { username, password } = req.body;
    try {
        const response = await userModel.findOne({ email: username, password: password })
        if (response) {
            req.session.user = response
            res.status(200).json({ message: 'success', data: response })
        } else {
            res.status(401).json({ message: 'error', data: 'login error' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
