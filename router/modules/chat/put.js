const axios = require('axios').default;

module.exports = {
  async chat_put(req, res) {
    var files_store = [];
    var file_type = JSON.parse(req.body.file_type);

    if (file_type === 5 || file_type === 6) {
      files_store.push({ name: req.body.gif_assets });
      if (file_type === 5) {
        var file_type = 5;
      } else {
        file_type = 6;
      }
    } else {
      for (var i = 0; i < req.files.length; i++) {
        var name = req.files[i].filename;
        files_store.push({ name: name });
      }
    }
    const obj = JSON.stringify(files_store);

    var file_type = file_type;
    var user1 = req.userData.userId;
    var message = req.body.message;
    var user2 = req.body.user2;
    var url = req.body.url;
    var accelerator = req.body.accelerator;
    var selected_id = JSON.parse(req.body.selected_id);
    var iso = req.body.iso;
    var messageType = req.body.messageType;
    var objType = req.body.objType;
    var objId = req.body.objId;
    const url = (process.env.MAINAPI_URL || 'http://localhost:3000') + '/chat/message/put';

    axios
      .post(url, {
        obj,
        file_type,
        user2,
        url,
        selected_id,
        user1,
        accelerator,
        message,
        iso,
        messageType,
        objType,
        objId,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.json({ msg: 'Error', id: '0', selected_id: selected_id, user_id: user2 });
      });
  },
};
