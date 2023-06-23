class Usuario {
    constructor(){
        this.id = 0, 
        this.nombre = []
    }
    listarAll(){
        return  this.nombre.length ? this.nombre : {error: 'No hay nombre registrados'}
    }
    listar(id){
        let user =  this.nombre.find(user => user.id == id)
        return user || {error: 'El usuario es incorrecto o no existe'}
    }
    saveUser(user){
        user.id = ++this.id
        this.nombre.push(user)
    }
    UpdateUser(user, id){
        user.id = Number(id)
        let index = this.nombre.findIndex(usuario => usuario.id == id)
        this.nombre.splice(index,1,user)
    }
    borrar(id){
        let index = this.usuario.findIndex(usuario => usuario.id == id)
        return this.nombre.splice(index,1,user)
    }
}
export default Usuario;