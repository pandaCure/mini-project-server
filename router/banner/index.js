const KoaRouter = require('koa-router')
const router = new KoaRouter()
const koaBody = require('koa-body')
const { createBanners, getBannerList } = require('../../controller/banners')
router.prefix('/banner')
const { bodyConfig, storePhotoDir } = require('../../config/koa-bady.config')
const { isExistDirOrMkDir } = require('../../utils/fs.helper')
// 检查是否存在这个目录
isExistDirOrMkDir(process.cwd(), storePhotoDir)
router.post('/', koaBody(bodyConfig), createBanners)
router.get('/', getBannerList)
module.exports = router
