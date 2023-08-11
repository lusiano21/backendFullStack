import express  from "express";
import UsuarioModel from "../../models/usuario.js";
import CommunsUtil from "../../utils/utils.views.js";
import MensajeModel from "../../models/mensaje.js";
import MensajesController from "../../controllers/mensajes.js";
import passport from "passport";
const router = express.Router();

router.get('/', async(req, res)=> {
  const { query: { limit = 2, page = 1, sort} } = req
  const options = {
    limit,
    page,
  }
  if (sort) {
    options.sort = { grade: sort }
  }
  const result = await UsuarioModel.paginate({}, options)
  res.render('datos', CommunsUtil.buidResponse({ ...result, sort }))
});

router.get('/reset', (req, res) => {
  res.render('reset')
})

router.post('/static', MensajesController.create)
router.get('/static', async (req, res) => {
  const mensajes = await MensajeModel.find()
  res.send( console.log(mensajes) )
})


router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))
export default router;