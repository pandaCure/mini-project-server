const fs = require('fs')
const path = require('path')
const isExistDirOrMkDir = (dirPath, storePhotoDir) => {
  const storePhotoDirPath = path.resolve(dirPath, `${storePhotoDir}`)
  const existDir = fs.existsSync(storePhotoDirPath)
  if (!existDir) {
    fs.mkdirSync(storePhotoDirPath)
  }
}
module.exports = {
  isExistDirOrMkDir
}
