const { UploadHelper } = require('../../utils/upload.helper.js')
const uploadMiddleware = config => {
  return async (ctx, next) => {
    Object.defineProperty(ctx, 'uploadQiNiu', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: new UploadHelper(config)
    })
    console.log(ctx.uploadQiNiu)
    await next()
  }
}
module.exports = {
  uploadMiddleware
}
