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

    async addProductToCart(cartId, productId) {
        try {
            if (this.fileExists(this.#path)) {
                const carts = await this.#leer()
                const cartIndex = carts.findIndex((item) => item.id == cartId)
                //Valida que el carrito con ese id exista
                if (cartIndex !== -1) {
                    const productIndex = carts[cartIndex].products.findIndex(
                        (item) => item.product == productId
                    )
                    //Valida si el producto ya esta en el carrito
                    if (productIndex !== -1) {
                        carts[cartIndex].products[productIndex].quantity++
                    } else {
                        let product = { product: parseInt(productId), quantity: 1 }
                        carts[cartIndex].products.push(product)
                    }

                    fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                    return { msg: 'Producto agregado al carrito' }
                } else {
                    throw Error(`El carrito con el id ${cartId}  no existe.`)
                }
            } else {
                let msg = 'El archivo que estas buscando no existe.'
                console.log(msg)
                return { msg }
            }
        } catch (error) {
            console.log(error)
            console.log('Error al guardar el producto')
            return { msg: 'Error al guardar el producto' }
        }
    }

}