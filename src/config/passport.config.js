import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import UserModel from '../models/usuario.js'
import config from './config.js'

function cookieExtractor(req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.token
  }
  return token
}

const initPassport = () => {

  const githubOptions = {
    clientID: config.github.ClientId,
    clientSecret: config.github.ClientSecret,
    callbackURL: config.github.CallbackURL,
  }
  /*
  passport.use('register', new LocalStrategy(options, async (req, email, password, done) => {
    const {
      body: {
        nombre,
        apellido,
        edad,
        dni
      }
    } = req
  
    if (
      !nombre ||
      !apellido ||
      !edad ||
      !dni
    ) {
      return done(new Error('Todo los campos debe venir en la solicitud.'))
    }

    try {
      let user = await UserModel.findOne({ email })

      if (user) {
        console.log('User already register.')
        return done(null, false)
      }

      user = await UserModel.create({
        nombre,
        apellido,
        email,
        edad,
        dni,
        password: createHash(password),
      })
      
      done(null, user)
  
    } catch (error) {
      return done(new Error('Error al obtener el usuario:', error.message))
    }
  }))

  passport.use('login', new LocalStrategy(loginOptions, async (email, password, done) => {

    try {
      const user = await UserModel.findOne({ email })
  
      if (!user) {
        return done(null, false)
      }
    
      if (!validatePassword(password, user)) {
        return done(null, false)
      }
      done(null, user)
      const token = tokenGenerator(user)
  
  res.cookie('token', token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  }).status(200).json({ success: true })
    } catch (error) {
      return done(new Error('Error al obtener el usuario:', error.message))
    }
  }))
  */
  passport.use(new GithubStrategy(githubOptions, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('profile', profile)
      let user = await UserModel.findOne({ email: profile._json.email })
      if (!user) {
        user = await UserModel.create({
          nombre: profile._json.name,
          apellido: '',
          email: profile._json.email,
          edad: 18,
          password: '',
        })
      }
      console.log('user', user);
      done(null, user)
    } catch (error) {
      return done(new Error('Error al obtener el usuario:' + error.message))
    }
  }))
  
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.clueJWT,
  }, (payload, done) => {
    return done(null, payload)
  }))
}

export default initPassport