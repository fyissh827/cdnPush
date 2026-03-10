const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../service/s3Client');



let fileSystem = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        return cb(null, `${globalThis.mediaDirectory}/comments/images`);
      },
      filename: (req, file, cb) => {
        var extention = file.mimetype.split('/')[1];
        return cb(null, `${req.userData.userId}ASB_8989_${Date.now()}.${extention}`);
      },
    }),
  })

  let s3Upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET || 'gdfgdfg',
      contentType: multerS3.AUTO_CONTENT_TYPE || 'fdfsdfsdfds',
      key: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        const filename = `${req.userData.userId}ASB_8989_${Date.now()}.${extension}`;

        cb(null, `comments/images/${filename}`);
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024, // optional: 5MB
    },
  })
  module.exports = {
  upload: (process.env.s3) ? s3Upload : fileSystem
}