import mongoose from 'mongoose';
import { URL } from '../config/database.config.js';

export async function conectar() {
    await mongoose.connect(URL)
}