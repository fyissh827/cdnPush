const centralApi = require('../../../externalCalls/index');

module.exports = {
  async chat_put(req, res) {
    try {

      let files_store = [];
      let file_type = JSON.parse(req.body.file_type);

      if (file_type === 5 || file_type === 6) {

        files_store.push({ name: req.body.gif_assets });
        file_type = file_type === 5 ? 5 : 6;

      } else {

        for (let i = 0; i < req.files.length; i++) {
          files_store.push({ name: req.files[i].filename });
        }

      }

      const obj = JSON.stringify(files_store);

      const user1 = req.userData.userId;
      const message = req.body.message;
      const user2 = req.body.user2;
      const url = req.body.url;
      const accelerator = req.body.accelerator;
      const selected_id = JSON.parse(req.body.selected_id);
      const iso = req.body.iso;
      const messageType = req.body.messageType;
      const objType = req.body.objType;
      const objId = req.body.objId;

      const response = await centralApi.post('/chat/message/put', {
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
      });

      res.json(response);

    } catch (error) {

      res.json({
        msg: 'Error',
        id: '0',
        selected_id: req.body.selected_id,
        user_id: req.body.user2
      });

    }
  },
};