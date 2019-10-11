const Koa = require('koa')
const cors = require('koa2-cors')
const ip = require('ip')
const package = require('./package.json')
const app = new Koa()
const router = require('./router/index')
const logger = require('./middleware/logger/logger.js')
app.use(cors())
app.use(
  logger({
    env: process.env.NODE_ENV,
    projectName: package.name,
    appLogLevel: 'info',
    dir: 'logs',
    serverIp: ip.address()
  })
)
router(app)
module.exports = app
