export class Producto {
    constructor({ title, description, code, price, id, status, stock, category, thumbnails }) {
        if (!id && typeof id !== 'string') throw new Error("falta el id") 
        this.id = id
        
        if (!title && typeof title !== 'string') throw new Error("falta el titulo")
        this.title = title

        // if (!description) throw new Error("falta la descripción")
        // this.description = description

        // if (!code) throw new Error("falta el code")
        // this.code = code

        if (!price && !isNan(price)) throw new Error("falta el precio")
        this.price = price

        this.status = true

        // if (!stock) throw new Error("falta el stock")
        // this.stock = stock

        // if (!category) throw new Error("falta la categoria")
        // this.category = category

        this.thumbnails = []
    }
}