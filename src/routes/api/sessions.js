import passport from 'passport'
import UsuarioModel from "../../models/usuario.js";
import { Router } from 'express'
import { tokenGenerator} from '../../utils/configBcrypt.js';

const router = Router()

router.post('/login', async (req,res) => {
  const { body: { email, password } } = req
      const user = await UsuarioModel.findOne({ email }) //serch({gmail}) 
      if (!user) {
        return res.status(401).json({ message: 'gmail or password incorrect' })
      }
      if (!password) {
        return res.status(401).json({ message: 'gmail or password incorrect' })
      }
      const token = tokenGenerator(user)
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      }).status(200).json({ success: true })
})
//.post('/register', UsuariosControllers.create)
/*.get('/me', authJWTMiddleware(['admin','user']), async (req, res) =>{ 
  try{
  const { id }  = req.user
  const user = await  getById(id) //UsuarioModel.findById(id)
  res.status(200).json(user)
  res.render('me', user)
  } catch (error) {
    next(error)
  }
})

router.post('/reset', async (req, res) => {
    const {
      body: {
        email,
        password,
      }
    } = req
    if (
      !email ||
      !password
    ) {
      return res.render('reset', { error: 'Todo los campos debe venir en la solicitud.' })
    }
    const user = await UsuarioModel.findOne({ email })
    if (!user) {
      return res.render('reset', { error: 'Email no existe.' })
    }
    user.password = createHash(password)
    await UsuarioModel.updateOne({ email }, user) 
    res.redirect('/login')
})*/
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/profile')
  });
router.post('/sign-out', (req, res) => {
    res.clearCookie('token').status(200).json({ success: true })
  })
export default router;
