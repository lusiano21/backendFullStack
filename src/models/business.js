import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({
  name: { type:String, require:true },
  products: [Object],
}, { timestamps: true })

export default mongoose.model('Business', businessSchema)