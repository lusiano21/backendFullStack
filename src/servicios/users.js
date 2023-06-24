import { usuarioRepository } from '../repositories/index.js'

class UsuarioController {
  static create(data) {
    return usuarioRepository.create(data)
  }

  static get(query = {}) {
    return usuarioRepository.get(query)
  }

  static getByid(id) {
    return usuarioRepository.getById(id)
  }

  static updateById(id, data) {
    return usuarioRepository.updateById(id, data)
  }

  static deleteById(id) {
    return usuarioRepository.deleteById(id)
  }
}

export default UsuarioController;