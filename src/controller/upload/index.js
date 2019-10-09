const qiniu = require("qiniu");
const fs = require("fs");
const uploadConfig = require("../../config/upload-config");
const accessKey = uploadConfig.AccessKey;
const secretKey = uploadConfig.SecretKey;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
console.log(mac);
const options = {
  scope: uploadConfig.Bucket
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
console.log(uploadToken);
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
const postImage = async (ctx, next) => {
  await next();
};
module.exports = {
  postImage
};
