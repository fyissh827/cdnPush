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
const axios  = require('axios');
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
        <h1>CDNPUSH SERVICE WORKING CORRECTLY.</h1>
      </body>
    </html>
  `);
});
globalThis.mediaDirectory = process.env.IMAGE_PATH || '/home/admin/domains/media'; //path.resolve(__dirname  + '/../media');
console.log(process.env);
app.get('/communicate', async function (req, res) {
 
    axios.get(`${process.env.MAINAPI_URL || 'http://localhost:3000'}/check`).then(r => res.json(r.data)).catch(e => res.json(e));
 
});
app.get('/media', function (req, res) {
  res.json(globalThis.mediaDirectory);
});
// ok....... ggdgdf
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('', router);
// run server
app.listen(PORT, '0.0.0.0', () => lightship.signalReady());
