import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const usuario = new mongoose.Schema({
  nombre: { type: String, require: true },
  apellido: { type: String, require: true },
  edad: { type: Number, require: true },
  dni: { type: String, require: true, unique: true },
  rol:{ type: String, default: 'user',enum: ['admin', 'user'] },
  email: { type: String, require: true, unique: true },
  password:{ type: String, require: true },
  domicilios: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Domicilio' }], default: [] }
}, { timestamps: true })

usuario.plugin(mongoosePaginate);
usuario.pre('find', function () {
    this.populate('domicilios')
  })

export default mongoose.model('Usuario', usuario)