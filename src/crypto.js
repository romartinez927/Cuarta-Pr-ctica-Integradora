import bcrypt from "bcrypt"

export function encriptar(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function validarPassword(recibida, almacenada) {
    return bcrypt.compareSync(recibida, almacenada)
}

const id = "Iv1.25f8e2396563cd13"
const secret = "cd4d7879479519311cae15b318ba6c5f347373d6"