import { createTransport } from 'nodemailer'
import { encriptar } from '../utils/crypto.js';
import { usersRepository } from '../repositories/users.repository.js';
import jwt from 'jsonwebtoken';

const clienteNodemailer = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'vern86@ethereal.email',
        pass: 'twEMBeuJjvH8RSt25j'
    }
});

export const sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body
    console.log(email)
    const secretKey = "secreto"
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' })

    let result = await clienteNodemailer.sendMail({
        from: "<rochi.martinez.927@gmail.com>",
        to: email,
        subject: "Correo",
        text: "Hola, esto es una prueba de envio de correo",
        html: `<div><h1>Hola, esto es una prueba de envio de correo</h1>
        <a href="http://localhost:8080/forgot/${token}">Click aquí para resetear tu contraseña</a>
        </div>`,
    })
    console.log(result)
    return result;
}

export const forgotPageController = async (req, res) => {
    res.render('mailing', { title: 'Restaurar Contraseña' })
};

export const resetPasswordController = async (req, res) => {
    const { email, password } = req.body;

    let newPassword = encriptar(password)
    console.log(newPassword)

    try {
        if (!email || !password ) {
            console.log("completar todos los campos")
        }

        // if (!isValidPassword(repeatPassword, newPassword)) {
        //     return res.status(400).json({ message: 'error', data: 'passwords do not match' })
        // }

        const user = await usersRepository.getUserByEmail(email)
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'error', data: 'User not exist' })
        } else {
            user.password = newPassword
            const result = await usersRepository.updateUserPassword(email, newPassword)
            console.log(result)
            return result
            if (user) {
                return res.status(200).json({ message: 'success', data: 'Password Updated' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const resetPasswordEmailController = async (req, res) => {
    // Se resetea el password usando el token generado
    const { key } = req.params;
    const { password, email } = req.body;
    let newPassword = encriptar(password)
    try {
        const user = await usersRepository.getUserByEmail(email)
        console.log(user)
        if (user) {
            const result = await usersRepository.updatePassword(email, newPassword)
            console.log(result)
            return result
        } else {
            res.send('ERROR')
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

export const resetPasswordCreateController = async (req, res) => {
    // se crea el token
    const { key } = req.params;

    const token = crypto.randomBytes(20).toString('hex');
    // send Mail
    sendResetPasswordEmail({ key, token })


    const resetPassword = new resetPasswordModel({
        email: key,
        token: token,
        status: true,
    })

    const result = await resetPassword.save();

    if (result) {
        res.send(`Reset password for user ${result}`);
    } else {
        res.send('ERROR')
    }
}

export const resetPasswordPageController = async (req, res) => {
    res.render('resetpassword', { title: 'Reset Password', stylesheet: 'resetpassword' })

}