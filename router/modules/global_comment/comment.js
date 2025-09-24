const axios = require('axios').default;

module.exports = {
  async comment(req, res) {
    var files_store = [];
    for (var i = 0; i < req.files.length; i++) {
      var name = req.files[i].filename;
      files_store.push({ name: name });
    }
    const obj = JSON.stringify(files_store);

    var file_type = req.body.file_type;
    var userId = req.userData.userId;
    var grewtale = req.body.grewtale;
    var primitive_id = req.body.primitive_id;
    var accelerator = req.body.accelerator;
    var message = req.body.message;
    var type = req.body.type;
    var standard = req.body.standard;
    var iso = req.body.iso;
    var point = req.body.point;

    const url = (process.env.MAINAPI_URL || 'http://localhost:3000') + '/p/comment';

    axios
      .post(url, {
        obj,
        file_type,
        userId,
        grewtale,
        primitive_id,
        accelerator,
        message,
        type,
        standard,
        iso,
        point,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.json({ msg: 'Error', id: '0' });
      });
  },
};
