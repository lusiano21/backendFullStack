import { Router } from "express";
import BusinessRouter from "./api/business.router.js"
import UsuarioRouter from "./api/usurios.router.js";
import ProductsRouter from "./api/products.router.js";
import OrdersRouter from "./api/orders.router.js";
import DomiciliosRouter from "./api/domicilios.router.js";
import ViewsRouter from "./views/views.router.js";
import SessionsRouter from "./api/sessions.js";
const router = Router()
router.use('/api/sessions', BusinessRouter, UsuarioRouter, ProductsRouter, OrdersRouter, DomiciliosRouter, SessionsRouter)
router.use('/', ViewsRouter)
export default router;