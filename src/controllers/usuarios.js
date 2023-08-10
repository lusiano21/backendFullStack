import { createUser, getUsers, getUserById, getUserOne, updateUserById, deleteById } from "../dao/user.js";
import { createHash } from "../utils/configBcrypt.js";
import CustomError from '../utils/errors/CustomErros.js'
import EnumsError from '../utils/errors/EnumsError.js'
import { generatorUserError } from '../utils/errors/MessagesError.js'
import config from '../config/config.js'

export const create = async (req, res, next ) => {
  try {
    const {
      nombre,
      apellido,
      email,
      dni,
      edad,
      password
    } = req.body
    const { file } = req
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
    const user = await createUser({
      nombre,
      apellido,
      email,
      avatar:`${config.NodeHost}:${config.NodePort}/static/img/${file.originalname}`,
      dni,
      edad,
      password: createHash(password),
    })
    res.status(201).json(user)
    
  } catch (error) {
    next(error)
  }
  
}
export const get = async (req,res,next) => {
  try {
    const users = await getUsers(req.query)
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
export const me = async (req, res, next) => {
try{
  const { id } = req.user
  const user = await getUserById(id)
  res.status(200).send({success:true, payload:user})
} catch (error) {
    next(error)
}

}
export const getById = async (req,res, next) => {
  try {
    const { params: {uid} } = req
    const user = await getUserById(uid);
    if (!user) {
      res.json({ status: 404 , message: 'Nose encontro el usuario' })
    } else
    {res.status(200).json(user)}
  } catch (error) {
    next(error)
  }
}
export const search = async (body) => {
  const user = await getUserOne(body)
  return {
    status: 'success',
    payload: user,
  }
}
export const updateById = async (req,res,next) => {
  try {
    const { body, params: {uid} } = req
    const user = await getUserById(uid)
    if(!user){
      res.json({ status: 404 , message: 'Nose encontro el usuario' })
    } else {
      const result = await updateUserById(uid, body)
      res.status(200).json(result)
    }
  } catch (error) {
    next(error)
  }
}
export const removeById = async (req,res,next) => {
  try {
    const { params: {uid} } = req
    const user = await getUserById(uid)
    if(!user){
      res.json({ status: 404 , message: 'Nose encontro el usuario' })
    } else {
    const result = await deleteById(uid)
    res.status(200).json(result)
    }
  } catch (error) {
    next(error)
  }
}