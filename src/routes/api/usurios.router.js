import { Router } from 'express'
import { authJWTMiddleware } from '../../utils/configBcrypt.js'
import { create, get, updateById, removeById, getById, search } from '../../controllers/usuarios.js'
import CustomError from '../../utils/errors/CustomErros.js'
import EnumsError from '../../utils/errors/EnumsError.js'
import { generatorUserError } from '../../utils/errors/MessagesError.js'

const router = Router()
router
  .post('/user', async (req,res,next) => {
    try {
      //const { body } = req
      const {
        nombre,
        apellido,
        email,
        dni,
        edad,
        password
      } = req.body
      if (!nombre || !apellido || !email || !dni || !edad || !password) {
        CustomError.createError({
          name: 'User creating error',
          cause: generatorUserError({
            nombre,
            apellido,
            email,
            dni,
            edad,
            password
          }),
          message: 'Error trying to create user',
          code: EnumsError.INVALID_TYPES_ERROR,
        })
      }
      const user = await create({
        nombre,
        apellido,
        email,
        dni,
        edad,
        password,
      })
      console.log(user)
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
  .get('/user/:uid',  async (req, res, next) =>{
    try {
      const userId = req.params.uid;
      const user = await getById(userId);
      res.status(200).json(user).send({payload:user})
    } catch (error) {
      next(error)
    }
  })
  .get('/me', authJWTMiddleware(['admin','user']), async (req, res, next) =>{ 
    try{
    //res.json({ success: true, message: 'This is a private route.', user: req.user })
    const { id }  = req.user
    const user = await getById(id)
    res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })
  //.get('/user/:id', UsuariosControllers.getById)
  .put('/user/:uid', async (req, res, next) =>{
    try {
      const user = await updateById(req.params.uid, req.body)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })
  .delete('/user/:uid', async (req, res, next)=>{
    try {
      const user = await removeById(req.params.uid)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })

export default router