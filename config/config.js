import dotenv from "dotenv"

dotenv.config({path:"./config/.env"})
export const pass = process.env.PASS
export const port = process.env.PORT
export const user = process.env.USER
export const clientID = process.env.CLIENTID
export const clientSecret = process.env.CLIENTSECRET
export const githubCallbackUrl = 'http://localhost:8080/api/sessions/githubCallback'




