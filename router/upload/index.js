const KoaRouter = require('koa-router')
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body')
const storePhotoDir = 'storePhotosDir'
// 检查是否存在这个目录
const storePhotoDirPath = path.resolve(process.cwd(), `${storePhotoDir}`)
const existDir = fs.existsSync(storePhotoDirPath)
if (!existDir) {
  fs.mkdirSync(storePhotoDirPath)
}
const bodyConfig = {
  multipart: true,
  formidable: {
    keepExtensions: true,
    onFileBegin: (name, file) => {
      file.path = path.join(process.cwd(), storePhotoDir) + '/' + name
    }
  }
}
const router = new KoaRouter()
const { postImage, callback } = require('../../controller/upload')
router.prefix('/upload')
router.post('/', koaBody(bodyConfig), postImage)
router.get('/callback', callback)
module.exports = router
