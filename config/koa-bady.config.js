const path = require('path')
const storePhotoDir = 'storePhotosDir'
const bodyConfig = {
  multipart: true,
  formidable: {
    keepExtensions: true,
    onFileBegin: (name, file) => {
      file.path = path.join(process.cwd(), storePhotoDir) + '/' + name
    }
  }
}
module.exports = {
  bodyConfig,
  storePhotoDir
}
