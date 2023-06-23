import { Router } from "express";
import UsuarioRouter from "./api/usurios.router.js";
import ProductsRouter from "./api/products.router.js";
import CartsRouter from "./api/carts.router.js";
import DomiciliosRouter from "./api/domicilios.router.js";
import ViewsRouter from "./views/views.router.js";
import SessionsRouter from "./api/sessions.js";
const router = Router()
router.use('/api/sessions', UsuarioRouter, ProductsRouter, CartsRouter, DomiciliosRouter, SessionsRouter)
router.use('/', ViewsRouter)
export default router;