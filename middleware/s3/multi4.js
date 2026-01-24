const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./config/s3');

module.exports = {
  upload: multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,

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
  }),
};
