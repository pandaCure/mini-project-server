const Koa = require("koa");
const cors = require("koa2-cors");
const app = new Koa();
const router = require("./router/index");
router(app);
app.use(cors());
app.listen(3000, err => {
  if (!err) console.log("server is starting port ---> 3000");
});
