import http from 'http'
import { socketInit } from './socketServer.js'
import app from './src/app.js'
import config from './src/config/config.js'

const server = http.createServer(app)
socketInit(server)
const PORT = config.NodePort || 8080
const ENV = config.NodeEnv || 'local'

server.listen(PORT, () => {
  console.log(`Listening on ${PORT} in ${ENV} environment.`)
})

process.on('exit', () => {
  console.log('[Exit] Server closed')
})
process.on('uncaughtException', () => {
  console.log('[UncaughtException] Server closed')
  process.exit(1)
})
process.on('message', (msg) => {
  console.log('Message from parent:', msg)
})