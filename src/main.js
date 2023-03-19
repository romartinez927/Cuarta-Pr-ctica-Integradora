import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import { FileManager } from './FileManager.js'

const productsManager = new FileManager('./database/productos.json')

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))

const httpServer = app.listen(8080)

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
    console.log("cliente conectado")
    clientSocket.on('nuevoProducto', async producto => {
        await productsManager.guardar(producto)
        const data = await productsManager.buscar()
        const productos = data.map(m => ({ ...m }))
        io.sockets.emit('actualizarProductos', productos)
    })

    const data = await productsManager.buscar()
    const productos = data.map(m => ({ ...m }))
    io.sockets.emit('actualizarProductos', productos)
})

app.get('/realtimeproducts', async (req, res) => {
    res.render('realtimeproducts', {
        title: 'Real Time Products'
    })
})

app.get('/', async (req, res) => {
    const productos = await productsManager.buscar()
    res.render('index', {
        productos: productos,
        title: 'Productos'
    })
})