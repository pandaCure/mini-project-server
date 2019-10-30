const { UploadHelper } = require('../../utils/upload.helper.js')
const uploadMiddleware = config => {
  return async (ctx, next) => {
    try {
      Object.defineProperty(ctx, 'uploadQiNiu', {
        writable: false,
        enumerable: true,
        configurable: false,
        value: new UploadHelper(config)
      })
      await next()
    } catch (e) {
      ctx.throw(500, '图片上传实例新建错误')
    }
  }
}
module.exports = {
  uploadMiddleware
}
