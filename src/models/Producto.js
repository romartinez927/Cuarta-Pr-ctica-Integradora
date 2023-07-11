import { newCode } from "../utils/code.js"
import { obligatorio, validarCadena, validarEnteroPositivo } from "../utils/validations.js"
export class Producto {
    #title
    #description
    #code
    #price
    #stock
    #category
    #status
    #thumbnails

    constructor({ title, description, code = newCode(), price, stock, category, thumbnails }) {
        obligatorio(title, 'title')
        this.#title = validarCadena(title, "title")

        obligatorio(description, 'description')
        this.#description = validarCadena(description, "description")

        obligatorio(price, 'price')
        this.#price = price

        this.#status = true

        obligatorio(stock, 'stock')
        this.#stock = price

        obligatorio(category, 'category')
        this.#category = validarCadena(category, "category")

        this.#code = code
        this.#thumbnails = thumbnails
    }

    get description() { return this.#description }
    get title() { return this.#title }
    get code() { return this.#code }
    get price() { return this.#price }
    get stock() { return this.#stock }
    get category() { return this.#category }
    get thumbnails() { return this.#thumbnails }

    datos() {
        return {
            description: this.#description,
            title: this.#title,
            code: this.#code,
            price: Number(this.#price),
            stock: Number(this.#stock),
            category: this.#category,
            thumbnails: this.#thumbnails
        }
    }
}