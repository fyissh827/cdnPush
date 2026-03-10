const centralApi = require('../../../externalCalls/index');
const generateUniqueId = require('generate-unique-id');

const media_array = ['image', 'video'];

module.exports = {
  async grewtale(req, res) {
    try {

      const id = generateUniqueId({
        length: 11,
        useLetters: true
      });

      const dimensiondata = JSON.parse(req.body.dimensiondata);

      let files_store = [];
      let files = [];
      let _files = req.files;

      if (_files.photos !== undefined || _files.videos !== undefined) {

        if (_files.photos !== undefined) files = files.concat(_files.photos);
        if (_files.videos !== undefined) files = files.concat(_files.videos);

        for (let i = 0; i < files.length; i++) {

          let pretype = files[i].mimetype.split('/')[0];
          let type = media_array.indexOf(pretype) + 1;

          files_store.push({ name: '', t: '', e2: [], e: [], p: [] });

          if (type === 1) {

            files_store[i].name = files[i].filename + dimensiondata[i].d;
            files_store[i].t = 1;

          } else if (type === 2) {

            files_store[i].name = files[i].filename + dimensiondata[i].d;
            files_store[i].t = 2;

            files_store[i].p.push({
              name: files[i + 1].filename + dimensiondata[i + 1].d,
              t: 1
            });

            files.splice(i + 1, 1);
            dimensiondata.splice(i + 1, 1);

          }
        }
      }

      const obj = JSON.stringify(files_store);

      const file_type = req.body.file_type;
      const userId = req.userData.userId;
      const primitive_id = id;
      const title = req.body.title;
      const content = req.body.content;
      const standard = req.body.standard;
      const privacy = req.body.privacy;
      const webMeta = req.body.webMeta;
      const response = await centralApi.post('/p/grewtale', {
        obj,
        file_type,
        userId,
        primitive_id,
        title,
        content,
        standard,
        privacy,
        webMeta
      });

      res.json(response);

    } catch (error) {

      res.json({
        msg: 'Error',
        id: 0
      });

    }
  }
};