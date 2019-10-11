const qiniu = require('qiniu')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const uploadConfig = require('../../config/upload-config')
const storePhotoDirPath = path.resolve(process.cwd(), 'storePhotosDir/*.*')
const accessKey = uploadConfig.AccessKey
const secretKey = uploadConfig.SecretKey
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: uploadConfig.Bucket
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
var formUploader = new qiniu.form_up.FormUploader(config)
var putExtra = new qiniu.form_up.PutExtra()
const uploadFile = (uploadToken, key, localFile, putExtra) => {
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        reject(respBody)
      }
    })
  })
}
const readFilesPath = path => {
  return new Promise((resolve, reject) => {
    glob(path, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}
const postImage = async (ctx, next) => {
  let filesUploadFuncArr
  const filesPath = await readFilesPath(storePhotoDirPath)
  filesUploadFuncArr = filesPath.map(filePath => {
    const filename = path.basename(filePath)
    putExtra.fname = filename
    putExtra.resumeRecordFile = `./progress-${filename}.log`
    return uploadFile(uploadToken, filename, filePath, putExtra)
  })
  const result = await Promise.all(filesUploadFuncArr)
  ctx.body = { result }
}
const callback = async (ctx, next) => {
  ctx.throw(500, '服务器错误')
}
module.exports = {
  postImage,
  callback
}
