import http from 'http'
import { socketInit } from './socketServer.js'
import app from './src/app.js'

const server = http.createServer(app)
socketInit(server)
const PORT = process.env.NODE_PORT || 8080
const ENV = process.env.NODE_ENV || 'local'

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/static in ${ENV} environment.`)
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