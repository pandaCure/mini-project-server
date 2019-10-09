const KoaRouter = require("koa-router");
const router = new KoaRouter();
const { postImage } = require("../../controller/upload");
router.prefix("upload");
router.post("/", postImage);
module.exports = router;
