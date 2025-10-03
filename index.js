const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var path = require('path');
const router = require('./router/index.js');
var favicon = require('serve-favicon');
const { createLightship } = require('lightship');
const bunyanMiddleware = require('bunyan-middleware');
const { logger, bunyan } = require('./helper/logger');
const lightship = createLightship();
require('dotenv').config();

// set up port
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  })
);
app.use(cors());
app.use(
  bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'reqId',
    obscureHeaders: ['authorization'],
    logger,
    additionalRequestFinishData: (_req, _res) => {
      return {};
    },
  })
);
app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>CDN Check</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
          }
          h1 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>CDN SERVICE WORKING CORRECTLY.</h1>
      </body>
    </html>
  `);
});
globalThis.mediaDirectory = process.env.IMAGE_PATH || '/home/admin/domains/media'; //path.resolve(__dirname  + '/../media');
console.log(process.env);
app.get('/communicate', async function (req, res) {
   // const response = await fetch(`${process.env.MAINAPI_URL || 'http://localhost:3000'}/check`);
   const data = process.env.MAINAPI_URL;
  res.json(data);
});
app.get('/media', function (req, res) {
  res.json(globalThis.mediaDirectory);
});
// ok....... ggdgdf
app.use(favicon(path.join(__dirname, 'true.png')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user/cus_profile/v2/photo', express.static(`${globalThis.mediaDirectory}/user/images`));
app.use('/user/cus_profile/v1/photo', express.static(`${globalThis.mediaDirectory}/user/image`));
app.use(
  '/grewtale/media/v1/photo',
  express.static(`${globalThis.mediaDirectory}/grewtales/images`)
);
app.use('/comment/media/v1/photo', express.static(`${globalThis.mediaDirectory}/comments/images`));
app.use('/chat/media/v1/image', express.static(`${globalThis.mediaDirectory}/chat/image`));
app.use('/chat/media/v1/audio', express.static(`${globalThis.mediaDirectory}/chat/audio`));
app.use(
  '/grewtale/media/v1/videos',
  express.static(`${globalThis.mediaDirectory}/grewtales/videos`)
);
app.use(
  '/grewtale/media/v1/thumbnails',
  express.static(`${globalThis.mediaDirectory}/grewtales/thumbnails`)
);
app.use('', router);
// run server
app.listen(PORT, '0.0.0.0', () => lightship.signalReady());
