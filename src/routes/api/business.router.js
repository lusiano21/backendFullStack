import { Router } from 'express'

import {
  get,
  create,
  getById,
  updateById,
  removeById,
} from '../../controllers/business.js'

const router = Router()

router.get('/business', async (req, res, next) => {
  try {
    const business = await get(req.query)
    res.status(200).json(business)
  } catch (error) {
    next(error)
  }
})

router.post('/business', async (req, res, next) => {
  try {
    const business = await create(req.body)
    res.status(201).json(business)
  } catch (error) {
    next(error)
  }
})

router.get('/business/:id', async (req, res, next) => {
  try {
    const business = await getById(req.params.id)
    res.status(200).json(business)
  } catch (error) {
    next(error)
  }
})

router.put('/business/:id', async (req, res, next) => {
  try {
    const business = await updateById(req.params.id, req.body)
    res.status(200).json(business)
  } catch (error) {
    next(error)
  }
})

router.delete('/business/:id', async (req, res, next) => {
  try {
    const business = await removeById(req.params.id)
    res.status(200).json(business)
  } catch (error) {
    next(error)
  }
})

export default router