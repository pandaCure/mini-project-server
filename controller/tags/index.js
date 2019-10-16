const { Tag } = require('../../model')
exports.createTags = async ctx => {
  ctx.body = await Tag.create({
    key_word: '真棒'
  })
}
exports.getTags = async ctx => {
  ctx.body = await Tag.findAll()
}
