const KoaRouter = require("koa-router");
const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");
const storePhotoDir = "storePhotosDir";
// 检查是否存在这个目录
const storePhotoDirPath = path.resolve(process.cwd(), `${storePhotoDir}`);
const existDir = fs.existsSync(storePhotoDirPath);
if (!existDir) {
  fs.mkdirSync(storePhotoDirPath);
}
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./${storePhotoDir}`);
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname);
  }
});
const upload = multer({ storage: storage });
const router = new KoaRouter();
const { postImage, callback } = require("../../controller/upload");
router.prefix("/upload");
router.post("/", upload.any(), postImage);
router.get("/callback", callback);
module.exports = router;
