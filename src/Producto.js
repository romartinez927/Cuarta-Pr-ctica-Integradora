export class Producto {
    constructor({ title, description, code, price, id, status, stock, category, thumbnails }) {
        this.id = id
        if (!id || typeof id !== 'string') throw new Error("falta el id") 
        
        if (!title || typeof title !== 'string') throw new Error("falta el titulo")
        this.title = title

        // if (!description || typeof description !== 'string') throw new Error("falta la descripción")
        // this.description = description

        // if (!code || typeof code !== 'string') throw new Error("falta el code")
        // this.code = code

        if (!price || !isNan(price)) throw new Error("falta el precio")
        this.price = price

        this.status = true

        // if (!stock || !isNan(stock)) throw new Error("falta el stock")
        // this.stock = stock

        // if (!category || typeof category !== 'string') throw new Error("falta la categoria")
        // this.category = category

        this.thumbnails = []
    }
}