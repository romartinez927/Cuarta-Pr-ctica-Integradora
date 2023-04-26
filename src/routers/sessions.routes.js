import { Router } from "express";
import { userModel } from "../dao/mongo/models/users.model.js";

export const sessionsRouter = Router();

sessionsRouter.get('/', async (req, res) => {
    const userId = req.session.user?._id;
    try {
        if (userId) {
            const user = await userModel.findById(userId)
                .select('first_name last_name').lean()
            res.json({ message: 'User found', user: user })
        } else {
            res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})