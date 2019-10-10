const KoaRouter = require("koa-router");
const router = new KoaRouter();
const { postImage, callback } = require("../../controller/upload");
router.prefix("/upload");
router.post("/", postImage);
router.get("/callback", callback);
module.exports = router;
