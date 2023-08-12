import { init } from "./db/mongodb.js";
import  express  from "express";
import path from 'path'
import passport from "passport";
import routers from "./routes/index.router.js";
import cookieParser from "cookie-parser";
import initPassport from './config/passport.config.js'
import { addLogger } from "./utils/logger.js";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import __dirname from "./utils.js";

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
app.use('/static', express.static(path.join(__dirname, './public')))



const specs = swaggerJsDoc(swaggerOptions);
app.use(cookieParser())

app.set('view engine', 'hbs')
app.set('views', './views')

initPassport()

app.use(passport.initialize())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', routers)

app.use((error, req, res, next) => {
    req.logger.warning( 'Cuidado ',error)
    console.error('Error en el middelware', error)
    res
      .status(error.status || 500)
      .send({ message: error.message })
  })

export default app 
