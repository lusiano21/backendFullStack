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


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await init()

const app = express();

app.use(addLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static',express.static(path.join(__dirname, 'public')))
/*app.use(expressSession({ 
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://Luciano:w0z4V22sIOUPDcnN@cluster0.ulcy2bz.mongodb.net/sessions?retryWrites=true&w=majority",
    mongoOptions: {}, 
    ttl:15
  }),    
  secret: "uhifheifhsi7324HUDHWSIFG",
  resave: false,
    saveUninitialized: false
}));*/
app.use(cookieParser())
const hbs = create({ defaultLayout: 'index',
extname:'.hbs'});

app.engine('hbs', hbs.engine);

app.set('view engine',  'hbs');
app.set('views', path.join(__dirname ,'views'))

initPassport()

app.use(passport.initialize())

app.use('/', routers)
app.use(errorMiddleware)

app.use((err, req, res, next) => {
    req.logger.warning( 'Cuidaddo ',err)
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message })
  })

export default app
