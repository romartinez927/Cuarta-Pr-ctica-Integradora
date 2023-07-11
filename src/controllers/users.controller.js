import { usersRepository } from "../repositories/users.repository.js";

export const changeRole = async (req, res) => {
    const uid = req.params.uid;

    try {
        const user = await usersRepository.obtenerSegunId(uid)
        console.log(user)
        let updateFields

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        if (user.role === 'user') {
            updateFields = 'premium'
        } else if (user.role === 'premium') {
            updateFields = 'user'
        }
        console.log(updateFields)
        const response = await usersRepository.updateUser(uid, updateFields)
        console.log(response)
        if (response) {
            return res.status(200).json({ message: `${user.first_name} now has the ${updateFields} role` });
        } else {
            return res.status(500).json({ error: `Error updating user's role` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
