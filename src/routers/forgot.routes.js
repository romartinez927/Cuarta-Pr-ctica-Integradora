import { Router } from "express"
import { forgotPageController, resetPasswordEmailController, resetPasswordPageController, sendResetPasswordEmail } from "../controllers/forgot.controller.js"
import express from "express"

export const forgotRouter = Router()

forgotRouter.use(express.json())
forgotRouter.use(express.urlencoded({ extended: true }))

forgotRouter.get('/', forgotPageController)

forgotRouter.post('/:key', resetPasswordEmailController)

forgotRouter.get('/:key', resetPasswordPageController)

forgotRouter.post('/', sendResetPasswordEmail)