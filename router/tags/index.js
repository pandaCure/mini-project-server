const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { createTags, getTags } = require('../../controller/tags')
router.prefix('/tags')
router.post('/', createTags)
router.get('/', getTags)
module.exports = router
