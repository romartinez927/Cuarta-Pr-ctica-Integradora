export class Ticket {
    #code
    #amount
    #purchaser

    constructor({ code, amount }) {
        this.#code = code
        this.#amount = amount
        this.#purchaser = amount
    }

    get code() { return this.#code }
    get amount() { return this.#amount }
    get purchaser() { return this.#purchaser }

    datos() {
        return {
            code: this.#code,
            amount: this.#amount,
            purchaser: this.#purchaser
        }
    }
}