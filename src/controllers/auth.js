import UserModel from '../models/usuario.js'
import {createHash, validatePassword,tokenGenerator} from '../utils/configBcrypt.js'
import Exception from '../utils/exception.js'

class AuthController {

  static login = async (email, password) => {
    const user = await UserModel.findOne({ email })
    if(!user) {
      throw new Exception('Email or password is incorrect.', 401)
    }
    if(!validatePassword(password, user)) {
      throw new Exception('Email or password is incorrect.', 401)
    }
    return tokenGenerator(user)
  }

  static register = async (data) => {
    const { nombre,apellido, dni, edad, email, password } = data
    let user = await UserModel.findOne({ email })
    if (user) {
      throw new Exception('Email already exists.', 400)
    }
    user = await UserModel.create({ nombre,apellido, dni, edad, email, password: createHash(password) })
    return { success: true }
  }

}

export default AuthController