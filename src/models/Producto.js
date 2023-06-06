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
        if (!title || typeof title !== 'string') throw new Error("falta el titulo")
        this.#title = title

        if (!description || typeof description !== 'string') throw new Error("falta la descripción")
        this.#description = description

        if (!price) throw new Error("falta el precio")
        this.#price = price

        this.#status = true

        if (!stock) throw new Error("falta el stock")
        this.#stock = stock

        if (!category || typeof category !== 'string') throw new Error("falta la categoria")
        this.#category = category

        this.#code = code

        if (typeof thumbnails !== 'string') throw new Error("el thumbnail debe ser un string")
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