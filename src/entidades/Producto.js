export class Producto {
    #title
    #description
    #code
    #price
    #stock
    #category
    #status

    constructor({ title, description, code, price, stock, category }) {
        if (!title || typeof title !== 'string') throw new Error("falta el titulo")
        this.#title = title

        if (!description || typeof description !== 'string') throw new Error("falta la descripción")
        this.#description = description

        if (!code || typeof code !== 'string') throw new Error("falta el code")
        this.#code = code

        if (!price) throw new Error("falta el precio")
        this.#price = price

        this.#status = true

        if (!stock) throw new Error("falta el stock")
        this.#stock = stock

        if (!category || typeof category !== 'string') throw new Error("falta la categoria")
        this.#category = category

    }

    get description() { return this.#description }
    get title() { return this.#title }
    get code() { return this.#code }
    get price() { return this.#price }
    get stock() { return this.#stock }
    get category() { return this.#category }

    datos() {
        return {
            description: this.#description,
            title: this.#title,
            code: this.#code,
            price: Number(this.#price),
            stock: Number(this.#stock),
            category: this.#category
        }
    }
}