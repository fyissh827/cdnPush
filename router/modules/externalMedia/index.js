const https = require('https');
const http = require('http');
const fs = require('fs');
var CryptoJS = require('crypto-js');
module.exports = {
  async externalMedia(req, res) {
    var url = decodeURIComponent(req.query.url);
    const info2 = CryptoJS.AES.decrypt(url, 'BELL_TONIGHT_827').toString(CryptoJS.enc.Utf8);
    var b = info2.split(':')[0];

    if (b) {
      if (b === 'https') {
        const request = https.get(info2, function (response) {
          const contentType = response.headers['content-type'];
          res.setHeader('Content-Type', contentType);
          response.pipe(res);
        });
      } else {
        request = http.get(info2, function (response) {
          contentType = response.headers['content-type'];
          res.setHeader('Content-Type', contentType);
          response.pipe(res);
        });
      }
    }
  },
};
