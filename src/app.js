import { init } from "./db/mongodb.js";
import  express  from "express";
import { create } from 'express-handlebars';
import path from 'path'
import passport from "passport";
import { fileURLToPath } from 'url'
import routers from "./routes/index.router.js";
import cookieParser from "cookie-parser";
import initPassport from './config/passport.config.js'
import ServiceEmail from "./servicios/email.js";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await init()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static',express.static(path.join(__dirname, 'public')))
app.get('/email', async (req, res) => {
    const result = await ServiceEmail.sendEmail(
      'toretoltt818@gmail.com',
      'Hola. Cómo estás?',
      `
      <div>
        <h1>Hola. Cómo estás?</h1>
        <p>Con este enlace podras cambiar tu contraseña</p>
        <a href="http://localhost:8080/new-password?token=${Date.now()}">Cambiar contraseña</a>
        <p>Saludos.</p>
      </div>
      `,
    )
    console.log(result)
    res.send(`
    <div>
      <h1>Hello email!</h1>
      <a href="/">Go back</a>
    </div>
    `)
  })
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

app.use((err, req, res, next) => {
    console.error(err)
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message })
  })

export default app
