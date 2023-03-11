import { Router } from "express"
import { FileManager } from "../fileManager.js"
import { Producto } from "../Producto.js"
import { randomUUID } from "crypto"

export const productsRouter = Router()

const personasManager = new FileManager('./database/products.json')

productsRouter.get('/', async (req, res, next) => {
    try {
        const personas = await personasManager.buscarCosas()
        res.json(personas)
    } catch (error) {
        next(error)
    }
})
productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const persona = await personasManager.buscarCosaSegunId(req.params.pid)
        res.json(persona)
    } catch (error) {
        next(error)
    }
})
productsRouter.post('/', async (req, res, next) => {
    try {
        const persona = new Producto({
            id: randomUUID(),
            ...req.body
        })
        const agregada = await personasManager.guardarCosa(persona)
        res.json(agregada)
    } catch (error) {
        next(error)
    }
})
productsRouter.put('/:pid', async (req, res, next) => {
    let personaNueva
    try {
        personaNueva = new Producto({
            id: req.params.pid,
            ...req.body
        })
    } catch (error) {
        next(error)
        return
    }

    try {
        const personaReemplazada = await personasManager.reemplazarCosa(req.params.pid, personaNueva)
        res.json(personaReemplazada)
    } catch (error) {
        next(error)
    }
})
productsRouter.delete('/:pid', async (req, res, next) => {
    try {
        const borrada = await personasManager.borrarCosaSegunId(req.params.pid)
        res.json(borrada)
        // res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})