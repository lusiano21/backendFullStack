import { Router } from 'express'

import {
  get,
  getById,
  create,
  resolve,
} from '../../controllers/orders.js'

const router = Router()

router.get('/order', async (req, res, next) => {
  try {
    const orders = await get(req.query)
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

router.post('/order', async (req, res, next) => {
  try {
    const order = await create(req.body)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/order/:id', async (req, res, next) => {
  try {
    const order = await getById(req.params.id)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/order/:id/resolve', async (req, res, next) => {
  try {
    const order = await resolve(req.params.id, req.body)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

export default router