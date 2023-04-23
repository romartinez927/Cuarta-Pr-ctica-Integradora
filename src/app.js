import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { apiRouter } from './routers/apiRouter.js'
import { PORT } from '../config/server.config.js'
import { chatRouter } from './routers/chatRouter.js'
import { conectar } from '../database/mongoose.js'
import { viewsRouter } from './routers/viewsRouter.js'

await conectar()

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))

const server = app.listen(PORT)
console.log(`escuchando en PORT ${PORT}`)

export const io = new Server(server)

app.use("/api", apiRouter)
app.use("/chat", chatRouter)
app.use("/", viewsRouter)



