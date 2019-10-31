const qiniu = require('qiniu')
class UploadHelper {
  constructor(uploadConfig) {
    this.uploadToken = null
    this.formUploader = null
    this.putExtra = null
    this.init(uploadConfig)
  }

  init(uploadConfig) {
    const accessKey = uploadConfig.AccessKey
    const secretKey = uploadConfig.SecretKey
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const options = {
      scope: uploadConfig.Bucket
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    this.uploadToken = putPolicy.uploadToken(mac)
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2
    this.formUploader = new qiniu.form_up.FormUploader(config)
    this.putExtra = new qiniu.form_up.PutExtra()
  }

  uploadFile(key, localFile, putExtra) {
    return new Promise((resolve, reject) => {
      this.formUploader.putFile(
        this.uploadToken,
        key,
        localFile,
        { ...this.putExtra, ...putExtra },
        function(respErr, respBody, respInfo) {
          if (respErr) {
            reject(respErr)
          }
          if (respInfo.statusCode === 200) {
            resolve(respBody)
          } else {
            reject(respBody)
          }
        }
      )
    })
  }
}
module.exports = {
  UploadHelper
}
