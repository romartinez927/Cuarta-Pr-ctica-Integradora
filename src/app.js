import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { apiRouter } from './routers/api.routes.js'
import { PORT } from '../config/server.config.js'
import { chatRouter } from './routers/chat.routes.js'
import { conectar } from '../database/mongoose.js'
import { viewsRouter } from './routers/views.routes.js'
import session from 'express-session'
import FileStore from "session-file-store"
import cookieParser from 'cookie-parser'
import { loginRouter } from './routers/login.routes.js'
import { registerRouter } from './routers/signup.routes.js'
import { profileRouter } from './routers/profile.routes.js'
import MongoStore from "connect-mongo"
import { URL } from '../config/database.config.js'

await conectar()

const app = express()
const filestorage = FileStore(session)

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 10000
    }),
    secret: 'codigo-s3cr3t0',
    resave: true,
    saveUninitialized: true
}))

const server = app.listen(PORT)
console.log(`escuchando en PORT ${PORT}`)

export const io = new Server(server)

app.use("/api", apiRouter)
app.use("/chat", chatRouter)
app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use("/profile", profileRouter)
app.use("/", viewsRouter)
