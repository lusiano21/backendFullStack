import { init } from "./db/mongodb.js";
import  express  from "express";
import { create } from 'express-handlebars';
import path from 'path'
import passport from "passport";
import { fileURLToPath } from 'url'
import routers from "./routes/index.router.js";
import cookieParser from "cookie-parser";
import initPassport from './config/passport.config.js'
import errorMiddleware from './utils/errors/MiddlewareError.js'
import { addLogger } from "./utils/logger.js";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await init()

const app = express();

app.use(addLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const swaggerOptions = {
  definition:{
    openapi:'3.0.1',
    info:{
      title:'Adoptme API',
      description:'Esta es la documentación de la API de Adoptme. Una aplicación para adoptar mascotas',
    },
  },
  apis:[path.join(__dirname, 'docs','**','*.yaml')],
};
app.use(express.static(path.join(__dirname, 'public')))



const specs = swaggerJsDoc(swaggerOptions);
app.use(cookieParser())
const hbs = create({ defaultLayout: 'index',
extname:'.hbs'});

app.engine('hbs', hbs.engine);

app.set('view engine',  'hbs');
app.set('views', path.join(__dirname ,'views'))

initPassport()

app.use(passport.initialize())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', routers)
app.use(errorMiddleware)

app.use((err, req, res, next) => {
    req.logger.warning( 'Cuidaddo ',err)
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message })
  })

export default app
