import UsuarioModel from '../models/usuario.js'

export const createUser = (user) => {
    return UsuarioModel.create(user)
  }

  export const getUsers = (query) =>  {
    return UsuarioModel.find(query)
  }

  export const getUserById = (id) => {
    return UsuarioModel.findById(id)
  }

  export const updateById = (id, data) => {
    return UsuarioModel.updateOne({ _id: id }, data )
  }

  export const deleteById = (id) => {
    return UsuarioModel.deleteOne({ _id: id })
  }