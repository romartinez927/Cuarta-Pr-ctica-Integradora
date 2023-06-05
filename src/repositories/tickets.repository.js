import { ticketsDaoMongoose } from '../dao/mongo/tickets.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const ticketsRepository = new GenericRepository(ticketsDaoMongoose)