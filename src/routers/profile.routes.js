import { Router } from "express";
import { userModel } from "../dao/mongo/models/users.model.js";
import { requireAuth } from "../middlewares.js";

export const profileRouter = Router();

profileRouter.get('/', requireAuth, async (req, res) => {
    const userId = req.session.user?._id;
    try {
        if (userId) {
            const user = await userModel.findById(userId)
                .select('first_name last_name age').lean()
            res.render('profile', { title: 'Profile', stylesheet: 'profile', user: user })
        } else {
            res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
        }

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

profileRouter.get('/logout', requireAuth, (req, res) => {
    try {
        req.session.destroy(err => {
            if (!err) {
                res.redirect('/login')
            }
            else res.send({ status: `logout ERROR`, body: err })
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

