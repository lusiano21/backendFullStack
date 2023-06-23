import { Router } from 'express'

import ProductsControllers from '../../controllers/products.js'

const router = Router()

router
  .post('/products', ProductsControllers.create)
  .get('/products', ProductsControllers.get)
  .get('/products/:id', ProductsControllers.getById)
  .put('/products/:id', ProductsControllers.updateById)
  .delete('/products/:id', ProductsControllers.deleteById)

export default router