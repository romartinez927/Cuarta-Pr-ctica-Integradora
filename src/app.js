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
import MongoStore from "connect-mongo"
import { URL } from '../config/database.config.js'
import { usersModel } from './dao/mongo/models/users.model.js'
import { auth } from './middlewares/autentication.js'

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
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

const server = app.listen(PORT)
console.log(`escuchando en PORT ${PORT}`)

export const io = new Server(server)

app.use("/api", apiRouter)
app.use("/chat", chatRouter)
app.use("/", viewsRouter)


app.get("/profile", auth, (req, res) => {
    res.render("profile", {title: "Profile", user: JSON.stringify(req.session["user"])})
})

app.post("/api/usuarios", async (req, res) => {
    console.log(req.body)
    const usuarioCreado = await usersModel.create(req.body)
    req.session.user = {
        name: usuarioCreado.name,
        email: usuarioCreado.email
    }
    res.send(usuarioCreado)
})

app.post("/api/sesiones", async (req, res) => {
    console.log(req.body)
    const usuarioEncontrado = await usersModel.findOne({ email: req.body.email }).lean()
  if (!usuarioEncontrado) return res.sendStatus(401)

  if (usuarioEncontrado.password !== req.body.password) {
    return res.sendStatus(401)
  }

  req.session.user = {
    name: usuarioEncontrado.name,
    email: usuarioEncontrado.email,
    age: usuarioEncontrado.age,
  }

  res.status(201).json(req.session.user)
})
