const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../service/s3Client');


let fileSystem = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        if (file.mimetype === 'image/webp') {
          return cb(null, `${globalThis.mediaDirectory}/chat/image`);
          v;
        } else {
          return cb(null, `${globalThis.mediaDirectory}/chat/audio`);
        }
      },
      filename: (req, file, cb) => {
        var extention = file.mimetype.split('/')[1];
        return cb(null, `${req.userData.userId}ASB_3232_${Date.now()}.${extention}`);
      },
    }),
  })

  let s3Upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET || 'fdfsdfs',
      contentType: multerS3.AUTO_CONTENT_TYPE || 'dfsdsfsd',

      key: (req, file, cb) => {
        let folder = 'chat/audio';

        if (file.mimetype === 'image/webp') {
          folder = 'chat/image';
        }

        const extension = file.mimetype.split('/')[1];
        const filename = `${req.userData.userId}ASB_3232_${Date.now()}.${extension}`;

        cb(null, `${folder}/${filename}`);
      },
    }),

    limits: {
      fileSize: 20 * 1024 * 1024, // optional (20MB)
    },
  })
  module.exports = {
  upload: (process.env.s3) ? s3Upload : fileSystem
}