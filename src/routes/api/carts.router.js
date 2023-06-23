import { Router } from 'express'

import CartsControllers from '../../controllers/carts.js'

const router = Router()

router
  .post('/carts', CartsControllers.create)
  .get('/carts', CartsControllers.get)
  .get('/carts/:id', CartsControllers.getById)
  .put('/carts/:id', CartsControllers.updateById)
  .delete('/carts/:id', CartsControllers.deleteById)

export default router