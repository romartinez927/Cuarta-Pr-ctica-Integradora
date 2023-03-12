import { Router } from "express"
import { Cart } from "../Cart.js"
import { FileManager } from "../fileManager.js"
import { randomUUID } from "crypto"

export const cartsRouter = Router()

const cartsManager = new FileManager('./database/carts.json')
const productsManager = new FileManager('./database/products.json')

cartsRouter.get('/', async (req, res, next) => {
    try {
        const carritos = await cartsManager.buscar()
        res.json(carritos)
    } catch (error) {
        next(error)
    }
})

cartsRouter.get('/:cid', async (req, res, next) => {
    try {
        const carrito = await cartsManager.buscarSegunId(req.params.cid)
        console.log(...carrito.products, carrito.products[0])
        res.json(carrito)
    } catch (error) {
        next(error)
    }
})

cartsRouter.post('/', async (req, res, next) => {
    try {
        const carrito = new Cart({
            products: [],
            id: randomUUID()
        })
        const agregada = await cartsManager.guardar(carrito)
        res.json(agregada)
    } catch (error) {
        next(error)
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res, next) => {
    const { cid, pid } = req.params;
    const product = await productsManager.getProductById(pid);
    if (product.id) {
      const cart = await cartsManager.addProductToCart(cid, pid);
      res.json(cart);
      return;
    }
    res.json({ msg: `El producto con el id ${pid} no existe.` });
    // try{
    //     const carrito = await cartsManager.buscarSegunId(req.params.cid)
    //     const producto = await productsManager.buscarSegunId(req.params.pid)
    //     let quantity = 1
    

        
    //     let carritoNuevo = new Cart({
    //         id: req.params.cid,
    //         products: [...carrito.products[0], {id: producto.id, quantity}]
    //     })
    
    //     const carritoReemplazado = await cartsManager.reemplazarFile(req.params.cid, carritoNuevo)
    //     res.json(carritoReemplazado)
    // } catch (error){
    //     next(error)
    // }
})

