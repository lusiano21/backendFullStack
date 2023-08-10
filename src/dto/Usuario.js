export default class UsuarioDTO {
    constructor(usuario){
      this.fullname = usuario.nombre + ' ' + usuario.apellido
      this.avatar = usuario.avatar
      this.edad = usuario.edad
      this.dni = usuario.dni
      this.email = usuario.email
      this.password = usuario.password
    }
}