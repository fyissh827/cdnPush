const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../service/s3Client');



let fileSystem = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file);
        if (file.fieldname === 'photos') {
          return cb(null, `${globalThis.mediaDirectory}/grewtales/images`);
        } else {
          if (file.mimetype === 'video/mp4') {
            return cb(null, `${globalThis.mediaDirectory}/grewtales/videos`);
          } else {
            return cb(null, `${globalThis.mediaDirectory}/grewtales/thumbnails`);
          }
        }
      },

      filename: (req, file, cb) => {
        var extention = file.mimetype.split('/')[1];
        return cb(null, `${req.userData.userId}ASB_5454_${Date.now()}.${extention}`);
      },
    }),
  });

let s3Upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET || 'dssadsad',
      contentType: multerS3.AUTO_CONTENT_TYPE || 'dssadsadsa',

      key: (req, file, cb) => {
        let folder = 'grewtales/thumbnails';

        if (file.fieldname === 'photos') {
          folder = 'grewtales/images';
        } else if (file.mimetype === 'video/mp4') {
          folder = 'grewtales/videos';
        }

        const extension = file.mimetype.split('/')[1];
        const filename = `${req.userData.userId}ASB_5454_${Date.now()}.${extension}`;

        cb(null, `${folder}/${filename}`);
      },
    }),

    limits: {
      fileSize: 100 * 1024 * 1024, // optional (100MB)
    },
  })
module.exports = {
  upload: (process.env.s3) ? s3Upload : fileSystem
};