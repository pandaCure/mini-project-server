const Koa = require("koa");
const cors = require("koa2-cors");
const app = new Koa();
const router = require("./router/index");
app.use(cors());
router(app);
module.exports = app;
