import { Router } from "express";
import { userModel } from "../dao/mongo/models/users.model.js";
import { requireNoAuth } from "../middlewares.js";

export const registerRouter = Router();

registerRouter.get('/', requireNoAuth, (req, res) => {
    res.render('register', { title: 'Signup' })
})

registerRouter.post('/', requireNoAuth, async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    try {
        const user = await userModel.create({
            first_name,
            last_name,
            email,
            password,
            age
        });
        res.status(201).json({ message: 'success', data: user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
