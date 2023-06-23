import UsuarioModel from "../models/usuario.js";
import { validatePassword,tokenGenerator, createHash } from "../utils/configBcrypt.js";
class UsuariosControllers {
    // CREATE
    static async login(req, res) {
      const { body: { gmail, password } } = req
      const user = await UsuarioModel.findOne({ gmail })
      if (!user) {
        return res.status(401).json({ message: 'gmail or password incorrect' })
      }
      if (!validatePassword(password, user)) {
        return res.status(401).json({ message: 'gmail or password incorrect' })
      }
  
      const token = tokenGenerator(user)
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      }).status(200).json({ success: true })
    }
      static async me(req, res) {
      const { id }  = req.user
      const result = await UsuarioModel.findById(id)
      if (!result) {
        return res.status(404).end()
      }
      res.status(200).json(result)
    }
    static async create(req, res) {
      const { body } = req
      const usuario = {
        ...body,
        password: createHash(body.password),
      }
      const result = await UsuarioModel.create(usuario)
      res.status(201).json(result)
    }
    static async get(req, res) {
      const result = await UsuarioModel.find()
      res.status(200).json(result)
    }
  
    static async getById(req, res) {
      const { params: { id } } = req
      const result = await UsuarioModel.findById(id)
      if (!result) {
        return res.status(404).end()
      }
      res.status(200).json(result)
    }
  
    static async updateById(req, res) {
      const { params: { id }, body } = req
      await UsuarioModel.updateOne({ _id: id }, { $set: body })
      res.status(204).end()
    }
  
    static async deleteById(req, res) {
      const { params: { id } } = req
      await UsuarioModel.deleteOne({ _id: id })
      res.status(204).end()
    }
    
  }
  export default UsuariosControllers;