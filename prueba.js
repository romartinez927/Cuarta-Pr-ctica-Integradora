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

// const secretKey = "secreto"
// const token = jwt.sign({ email: "hola" }, secretKey, { expiresIn: '1h' })
// console.log(token)

let email = "romartinez@live.com"
let newPassword = "newPassword"

const result = await usersRepository.updatePassword(email, newPassword)
console.log(result)