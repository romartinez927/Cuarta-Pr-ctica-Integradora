import fs from 'fs/promises'

export class FileManager {
    #file
    #path

    constructor(path) {
        this.#path = path
        this.#file = []
    }

    async #leer() {
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#file = JSON.parse(json)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#file, null, 2)
        await fs.writeFile(this.#path, nuevoJson)
    }

    async guardar(file) {
        await this.#leer()
        this.#file.push(file)
        await this.#escribir()
        return file
    }

    async buscar() {
        await this.#leer()
        return this.#file
    }

    async buscarSegunId(id) {
        await this.#leer()
        const buscada = this.#file.find(c => c.id === id)
        if (!buscada) {
            throw new Error('id no encontrado')
        }
        return buscada
    }

    async reemplazarFile(id, newFile) {
        await this.#leer()
        const indiceBuscado = this.#file.findIndex(c => c.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        this.#file[indiceBuscado] = newFile
        await this.#escribir()
        return newFile
    }

    async borrarSegunId(id) {
        await this.#leer()
        const indiceBuscado = this.#file.findIndex(c => c.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        const [borrado] = this.#file.splice(indiceBuscado, 1)
        await this.#escribir()
        return borrado
    }

    async addProductToCart(cartId, productId) {
        try {
            await this.#leer()
            const carts = await this.buscar()
            const cart = carts.find((item) => item.id == cartId)
            const product = cart.products.find((item) => item.product == productId)

            if (product) {
                product.quantity++
            } else {
                let product = { product: productId, quantity: 1 }
                cart.products.push(product)
            }

            await this.reemplazarFile(cartId, cart)
            return cart            
        } catch (error) {
            return { msg: 'Error al guardar el producto' }
        }
    }

}