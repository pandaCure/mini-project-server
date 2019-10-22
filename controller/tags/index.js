const { Tag } = require('../../model')
exports.createTags = async ctx => {
  const keyWord = ctx.request.body
  const result = await Tag.findOne({
    where: keyWord
  })
  if (result) {
    ctx.body = {
      status: 400,
      message: '已经存在该关键字'
    }
  } else {
    ctx.body = await Tag.create(keyWord)
  }
}
exports.getTags = async ctx => {
  ctx.body = await Tag.findAll()
}
