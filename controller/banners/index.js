const { Banner } = require('../../model')
exports.createBanners = async ctx => {
  const keyWord = ctx.request.body
  const result = await Banner.findOne({
    where: keyWord
  })
  if (result) {
    ctx.body = {
      status: 400,
      message: '已经存在该关键字'
    }
  } else {
    ctx.body = await Banner.create(keyWord)
  }
}
exports.getBannerList = async ctx => {
  ctx.body = await Banner.findAll()
}
