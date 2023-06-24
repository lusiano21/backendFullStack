import UsuarioDTODTO from '../dto/Usuario.js'

export default class Usuario {
  constructor(dao) {
    this.dao = dao
  }

  get() {
    return this.dao.get()
  }

  create(data) {
    const UsuarioDto = new ContactDTO(data)
    return this.dao.create(UsuarioDto)
  }

  getById(id) {
    return this.dao.getById(id)
  }

  updateById(id, data) {
    const UsuarioDto = new ContactDTO(data)
    return this.dao.updateById(id, UsuarioDto)
  }

  deleteById(id) {
    return this.dao.deleteById(id)
  }
}