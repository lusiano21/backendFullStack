export default class UsuarioDTO {
    constructor(usuario){
      this.fullname = usuario.firstName + ' ' + usuario.lastName
      this.edad = usuario.edad
      this.dni = usuario.dni
      this.email = usuario.email
      this.password = usuario.password
    }
}