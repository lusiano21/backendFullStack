import passport from 'passport'
import UsuarioModel from "../../models/usuario.js";
import { createHash} from '../../utils/configBcrypt.js'
import { Router } from 'express'

const router = Router()

//.post('/login', UsuariosControllers.login)
//.post('/register', UsuariosControllers.create)


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
})
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/profile')
  });

export default router;
