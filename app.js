const Koa = require('koa')
const cors = require('koa2-cors')
const ip = require('ip')
const packages = require('./package.json')
const app = new Koa()
const parser = require('koa-bodyparser')
const router = require('./router/index')
const logger = require('./middleware/logger/logger.js')
const handleError = require('./middleware/handleError/handleError')
const { uploadMiddleware } = require('./middleware/handleUpload/upload')
const uploadConfig = require('./config/upload-config')
app.use(handleError)
app.use(cors())
app.use(parser())
app.use(
  logger({
    env: process.env.NODE_ENV,
    projectName: packages.name,
    appLogLevel: 'info',
    dir: 'logs',
    serverIp: ip.address()
  })
)
app.use(uploadMiddleware(uploadConfig))
router(app)
module.exports = app
