// import { createTransport } from 'nodemailer'

// // const clienteNodemailer = createTransport({
// //     host: 'smtp.ethereal.email',
// //     port: 587,
// //     auth: {
// //         user: 'ruthe.douglas10@ethereal.email',
// //         pass: 'YbwSxHC2GtuNufCz3E'
// //     }
// // })

// const clienteNodemailer = createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'vern86@ethereal.email',
//         pass: 'twEMBeuJjvH8RSt25j'
//     }
// });

// const TEST_MAIL = 'ruthe.douglas10@ethereal.email'

// const mailOptions = {
//     from: 'Servidor Node.js',
//     to: TEST_MAIL,
//     subject: 'Mail de prueba desde Node.js',
//     // text: 'texto plano',
//     html: '<h1 style="color: blue;">Contenido de prueba con archivo adjunto desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
// }

// try {
//     const info = await clienteNodemailer.sendMail(mailOptions)
//     console.log(info)
// } catch (error) {
//     console.log(error)
// }
import jwt from "jsonwebtoken"
import { usersRepository } from "./src/repositories/users.repository.js"
import { Producto } from "./src/models/Producto.js"
import { productosRepository } from "./src/repositories/products.repository.js"

// const secretKey = "secreto"
// const token = jwt.sign({ email: "hola" }, secretKey, { expiresIn: '1h' })
// console.log(token)

let email = "romartinez@live.com"
let newPassword = "newPassword"

const result = await usersRepository.updatePassword(email, newPassword)
console.log(result)

// const producto = new Producto({
//     title: "Coca Cola",
//     price: 100,
//     description: "descripcion",
//     category: "product",
//     stock: 10,
    
// })
//     const productoGuardado = await productosRepository.create(producto.datos())
//     console.log(productoGuardado)

// const uid = "647f248ff49759e694b865c2"
// const updateFields = "premium"

// const response = await usersRepository.updateUser(uid, updateFields)

const user = await usersRepository.getUserByEmail("ro@live.com")
console.log(user)