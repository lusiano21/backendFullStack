import { Router } from 'express'
import { authJWTMiddleware, createHash } from '../../utils/configBcrypt.js'
import usuario from '../../models/usuario.js'
import { create, get } from '../../controllers/usuarios.js'
const router = Router()

router
  .post('/user', async (req,res,next) => {
    try {
      const { body } = req
      const user = await create({
        ...body,
        password: createHash(body.password),
      })
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
    
  })
  .get('/user',  async (req, res, next) =>{
    try {
      const users = await get(req.query)
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  })
  //.get('/me', authJWTMiddleware(['admin','user']), UsuariosControllers.me)
  //.get('/user/:id', UsuariosControllers.getById)
  .put('/user/:id', async (req, res, next) =>{
    try {
      const user = await updateById(req.params.id, req.body)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })
  .delete('/user/:id', async (req, res, next)=>{
    try {
      const user = await removeById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })

export default router