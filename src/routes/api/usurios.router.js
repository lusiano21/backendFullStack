import { Router } from 'express'
import { authJWTMiddleware } from '../../utils/configBcrypt.js'
import UsuariosControllers from '../../controllers/usuarios.js'

const router = Router()

router
  .post('/user', UsuariosControllers.create)
  .get('/user', UsuariosControllers.get)
  .get('/me', authJWTMiddleware(['admin','user']), UsuariosControllers.me)
  .get('/user/:id', UsuariosControllers.getById)
  .put('/user/:id', UsuariosControllers.updateById)
  .delete('/user/:id', UsuariosControllers.deleteById)

export default router