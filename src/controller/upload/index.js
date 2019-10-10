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
config.zone = qiniu.zone.Zone_z2;
var localFile = "/Users/zhangzhongyou/Desktop/stream和buffer.png";
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key = "tests.mp4";
// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra, function(
  respErr,
  respBody,
  respInfo
) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});
const postImage = async (ctx, next) => {
  console.log(1);
  ctx.body = { a: 1 };
};
const callback = async (ctx, next) => {
  console.log(1);
  await next();
};
module.exports = {
  postImage,
  callback
};
