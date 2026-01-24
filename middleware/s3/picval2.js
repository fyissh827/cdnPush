const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./config/s3');

const _time = Date.now();
const random = Math.round(Math.random());

module.exports = {
  upload: multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,

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
      fileSize: 5 * 1024 * 1024, // optional (5MB)
    },
  }),
};
