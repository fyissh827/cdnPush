const centralApi = require('../../../externalCalls/index');

module.exports = {
  async comment(req, res) {
    try {

      let files_store = [];

      for (let i = 0; i < req.files.length; i++) {
        files_store.push({ name: req.files[i].filename });
      }

      const obj = JSON.stringify(files_store);

      const file_type = req.body.file_type;
      const userId = req.userData.userId;
      const grewtale = req.body.grewtale;
      const primitive_id = req.body.primitive_id;
      const accelerator = req.body.accelerator;
      const message = req.body.message;
      const type = req.body.type;
      const standard = req.body.standard;
      const iso = req.body.iso;
      const point = req.body.point;

      const response = await centralApi.post('/p/comment', {
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
        point
      });

      res.json(response);

    } catch (error) {

      res.json({
        msg: 'Error',
        id: '0'
      });

    }
  },
};