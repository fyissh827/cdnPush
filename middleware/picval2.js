const path = require('path');
const multer = require('multer');
const _time = Date.now();
const random = Math.round(Math.random());
const multerS3 = require('multer-s3');
const s3 = require('../service/s3Client');

let fileSystem = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'avatar') {
        return cb(null, `${globalThis.mediaDirectory}/user/images`);
      } else {
        return cb(null, `${globalThis.mediaDirectory}/user/image`);
      }
    },

    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      return cb(null, `${req.userData.userId}ASB_${random}_${_time}.${extension}`);
    },
  }),
});

let s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET || 'sep',
    contentType: multerS3.AUTO_CONTENT_TYPE || 'fsfsdfsdfsdfsdfsd',

    key: (req, file, cb) => {
      let folder = 'user/image';

      if (file.fieldname === 'avatar') {
        folder = 'user/images';
      }

      const extension = file.mimetype.split('/')[1];
      const filename = `${req.userData.userId}ASB_${random}_${_time}.${extension}`;

      cb(null, `${folder}/${filename}`);
    },
  }),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  upload: process.env.s3 ? s3Upload : fileSystem,
};