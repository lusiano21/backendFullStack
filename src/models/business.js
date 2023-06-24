import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({
  name: String,
  products: [Object],
}, { timestamps: true })

export default mongoose.model('Business', businessSchema)