const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userMiddleware = require('../middleware/index');
const picval2 = require('../middleware/picval2');
const multi = require('../middleware/multi');
const multi2 = require('../middleware/multi2');
const multi4 = require('../middleware/multi4');
//date
const axios = require("axios");
const pic_update = require('./modules/profilepic/update');

//posting

const grewtale = require('./modules/posting/grewtale');
const grewtaleplus = require('./modules/posting/grewtale_plus');
const externalMedia = require('./modules/externalMedia/index');
const externalMediaSimple = require('./modules/externalMedia/simpleGet');
//global_comment

const comment = require('./modules/global_comment/comment.js');

//chat

const chat_put = require('./modules/chat/put.js');

//testers
const test = require('./modules/test/index');

const app = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/check').get((_req, res) => {
    res.status(200);
  res.json({
    connected: true,
    status: 'online',
  });
});

// userprofile photo update +m

router.use('/api/user/cus_profile/v1/photo', express.static('media/user/image'));
router.use('/api/user/cus_profile/v2/photo', express.static('media/user/images'));
router.route('/upload/profilepic').post(
  userMiddleware.isLoggedIn,
  picval2.upload.fields([
    { name: 'avatarshort', maxCount: 1 },
    { name: 'avatar', maxCount: 1 },
  ]),
  pic_update.profilepic
);

//lifeline&sub +m

// posting +m

router.use('/api/grewtale/media/v1/photo', express.static('media/grewtales/images'));
router.route('/p/grewtale').post(
  userMiddleware.isLoggedIn,
  multi.upload.fields([
    { name: 'photos', maxCount: 50 },
    { name: 'videos', maxCount: 10 },
  ]),
  grewtale.grewtale
);
router.route('/p/grewtaleplus').post(
  userMiddleware.isLoggedIn,
  multi.upload.fields([
    { name: 'photos', maxCount: 50 },
    { name: 'videos', maxCount: 10 },
  ]),
  grewtaleplus.grewtaleplus
);

//comment +m

router.use('/api/comment/media/v1/photo', express.static('media/comment/images'));
router
  .route('/p/comment')
  .post(userMiddleware.isLoggedIn, multi2.upload.array('commentfile', 30), comment.comment);
router.route('/external/media').get(externalMedia.externalMedia);
router.route('/external/media/simple').get(externalMediaSimple.externalMedia);

//chat

router
  .route('/chat/message/put')
  .post(userMiddleware.isLoggedIn, multi4.upload.array('file', 30), chat_put.chat_put);

//testers

router.route('/test/point').get(test.test);

module.exports = router;
