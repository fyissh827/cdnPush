var CryptoJS = require('crypto-js');
const { after } = require('lodash');
var btoa = require('btoa');

module.exports = {
  urlHashing: (a, b) => {
    var s = [];
    const date = JSON.stringify(Date.now());
    const session = 'APQsr01olxtYNPQpsCBPNrfgmno==';
    var encrypted = CryptoJS.AES.encrypt(date, 'Secret Passphrase');
    var hash = encodeURIComponent(encrypted);
    var d = JSON.parse(a);
    for (var i = 0; i < d.length; i++) {
      var t = d[i].name.split('?');

      if (t[1] === null || t[1] === undefined) r = '';
      else r = '_dms=' + t[1] + '&';
      var a_link =
        t[0] +
        `?` +
        r +
        `en_session=` +
        session +
        `&u_id=` +
        b +
        `&en_date=` +
        hash +
        `&en_name=` +
        encodeURIComponent(btoa(t[0]));
      d[i].name = a_link;

      if (d[i].p !== undefined) {
        for (var j = 0; j < d[i].p.length; j++) {
          var t2 = d[i].p[j].name.split('?');

          if (t2[1] === null || t2[1] === undefined) r = '';
          else r = '_dms=' + t2[1] + '&';
          var a_link2 =
            t2[0] +
            `?` +
            r +
            `en_session=` +
            session +
            `&u_id=` +
            b +
            `&en_date=` +
            hash +
            `&en_name=` +
            encodeURIComponent(btoa(t2[0]));
          d[i].p[j].name = a_link2;
        }
      }
    }

    return JSON.stringify(d);
  },
  hashingsingle: (a, b) => {
    const date = JSON.stringify(Date.now());
    const session = 'APQsr01olxtYNPQpsCBPNrfgmno==';
    var encrypted = CryptoJS.AES.encrypt(date, 'Secret Passphrase');
    var hash = encodeURIComponent(encrypted);
    var final =
      a +
      `?` +
      `en_session=` +
      session +
      `&u_id=` +
      b +
      `&en_date=` +
      hash +
      `&en_name=` +
      encodeURIComponent(btoa(a));

    return JSON.stringify(final);
  },
};
