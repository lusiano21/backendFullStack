import { Router } from 'express'

import DomiciliosControllers from '../../controllers/domicilios.js'

const router = Router()

router
  .post('/domicilios', DomiciliosControllers.create)
  .get('/domicilios', DomiciliosControllers.get)
  .get('/domicilios/:id', DomiciliosControllers.getById)
  .put('/domicilios/:id', DomiciliosControllers.updateById)
  .delete('/domicilios/:id', DomiciliosControllers.deleteById)

export default router