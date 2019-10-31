const path = require('path')
const rimraf = require('rimraf')
const glob = require('glob')
const { Banner } = require('../../model')
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
exports.createBanners = async ctx => {
  const filesPath = await readFilesPath(storePhotoDirPath)
  const filesUploadFuncArr = filesPath.map(filePath => {
    const filename = path.basename(filePath)
    putExtra.fname = filename
    putExtra.resumeRecordFile = `./progress-${filename}.log`
    return ctx.uploadQiNiu.uploadFile(filename, filePath, putExtra)
  })
  const result = await Promise.all(filesUploadFuncArr)
  const bannerInfo = ctx.request.body
  if (!bannerInfo) ctx.throw(400, '参数错误 ----> formData')
  const url = pictureUrl + result[0].key
  const params = {
    ...bannerInfo,
    url
  }
  const bannerData = await Banner.create(params)
  rimraf.sync(storePhotoDirPath)
  ctx.body = { bannerData }
}
exports.getBannerList = async ctx => {
  ctx.body = await Banner.findAll()
}
