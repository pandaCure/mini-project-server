const glob = require('glob')
const path = require('path')
const { Picture, PictureTag, Tag, sequelize } = require('../../model')
const uploadConfig = require('../../config/upload-config')
const storePhotoDirPath = path.resolve(process.cwd(), 'storePhotosDir/*.*')
const putExtra = {}
const pictureUrl = uploadConfig.Domain

const readFilesPath = path => {
  return new Promise((resolve, reject) => {
    glob(path, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}
const postImage = async (ctx, next) => {
  const filesPath = await readFilesPath(storePhotoDirPath)
  const filesUploadFuncArr = filesPath.map(filePath => {
    const filename = path.basename(filePath)
    putExtra.fname = filename
    putExtra.resumeRecordFile = `./progress-${filename}.log`
    return ctx.uploadQiNiu.uploadFile(filename, filePath, putExtra)
  })
  const result = await Promise.all(filesUploadFuncArr)
  const picture = ctx.request.body
  if (!picture) ctx.throw(400, '参数错误 ----> formData')
  const tags = JSON.parse(picture.tags)
  delete picture.tags
  const url = pictureUrl + result[0].key
  const params = {
    ...picture,
    url
  }
  let transaction
  try {
    transaction = await sequelize.transaction()
    const pictureData = await Picture.create(params, { transaction })
    await Promise.all(
      tags.map(async value => {
        const tagData = await Tag.findOne({
          where: {
            key_word: value
          }
        })
        await PictureTag.create(
          {
            picture_id: pictureData.id,
            tag_id: tagData.id
          },
          { transaction }
        )
      })
    )
    await transaction.commit()
  } catch (e) {
    console.log(e)
    if (transaction) await transaction.rollback()
  }

  ctx.body = { url }
}
const callback = async ctx => {
  ctx.throw(500, '服务器错误')
}
module.exports = {
  postImage,
  callback
}
