import { usersDaoMongoose, usersModel } from '../dao/mongo/users.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

class UsersRepository extends GenericRepository {
    constructor(dao) { super(dao) }
    // chequear este punto si no funciona
    getUserByEmail = async (email) => {
        let result = await this.dao.findByEmail(email)
        return result
    }
    createUser = async (newUser) => {
        try {
            let result = await this.dao.create(newUser)
            return result 
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateUser(userId, updateFields) {
        // const updatedUser = await this.dao.findOneAndUpdate({ _id: userId }, { $set: updateFields }, { new: true }) 
        return await this.dao.updateOne(userId, updateFields)
    }

    // async updatePassword(email, newPassword) {
    //     return await this.dao.findOneAndUpdate({ email }, { password: newPassword })
    // }
    
  }

export const usersRepository = new UsersRepository(usersDaoMongoose)