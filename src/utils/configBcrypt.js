
import jsonwebtoken from 'jsonwebtoken'
import passport from 'passport'
import multer from 'multer'
import config from '../config/config.js'
import bcrypt from 'bcrypt';


const JWT_SECRET = config.clueJWT
import Exception from './exception.js'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }

})

export const upleader = multer({storage})
export const tokenGenerator = (user) => {
  const payload = {
    id: user._id,
    name: user.nombre,
    last_name: user.apellido,
    age: user.edad,
    email: user.email,
    rol: user.rol,
    DNI: user.dni
  }
  const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '24h' })
  return token
}
export const isValidToken = (token) => {
  return new Promise((resolve) => {
    jsonwebtoken.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        console.log('err', error)
        return resolve(false)
      }
      console.log('payload', payload)
      return resolve(payload)
    })
    return token
  })
}

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const validatePassword = (password, user) => {
  return bcrypt.compareSync(password, user.password)
}
export const authJWTMiddleware =  (roles) => (req, res, next) => {
  passport.authenticate('jwt', function (error, user, info) {  
    if (error) {
      return next(error)
    }
    if (!user) {
      return next(new Exception('Unauthorized' , 401))
    }
    if (!roles.includes(user.rol)) { // Autorización
      return next(new Exception('Forbidden' , 403))
    }
    if (user.rol === 'user' && req.params.id && req.params.id !== student.id) {
      return next(new Exception('Forbidden' , 403))
    }
    req.user = user
    next()
  })(req, res, next)
}
export class NotFoundException extends Exception {
  constructor(message = 'Not found entity') {
    super(message, 404)
  }
}
