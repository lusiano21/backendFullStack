import mongoose from "mongoose";

const product = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  info: { type: String, require: true},
  stock: { type: Number, require: true },
  precio: { type: String, require: true, unique: true },
  category: { type: String, require: true}
})
export default mongoose.model('Product', product)