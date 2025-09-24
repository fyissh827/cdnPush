const axios = require('axios').default;
//const generateUniqueId = require('generate-unique-id');
const media_array = ['image', 'video'];
module.exports = {
  async grewtaleplus(req, res) {
    console.log(req.body);
    const dimensiondata = JSON.parse(req.body.dimensiondata);

    var files_store = [];
    var files = [];
    var _files = req.files;

    if (_files.photos !== undefined || _files.videos !== undefined) {
      if (_files.photos !== undefined) files = files.concat(_files.photos);
      if (_files.videos !== undefined) files = files.concat(_files.videos);
      for (var i = 0; i < files.length; i++) {
        var pretype = files[i].mimetype.split('/')[0];
        var type = media_array.indexOf(pretype) + 1;
        files_store.push({ name: '', t: '', e2: [], e: [], p: [] });
        if (type == 1) {
          files_store[i].name = files[i].filename + dimensiondata[i].d;
          files_store[i].t = 1;
        } else if (type === 2) {
          files_store[i].name = files[i].filename + dimensiondata[i].d;
          files_store[i].t = 2;
          files_store[i].p.push({
            name: files[i + 1].filename + dimensiondata[i + 1].d,
            t: 1,
          });
          files.splice(i + 1, 1);
          dimensiondata.splice(i + 1, 1);
        }
      }
    }

    const obj = JSON.stringify(files_store);
    const file_type = req.body.file_type;
    const userId = req.userData.userId;
    const primitive_id = req.body.id;
    const title = req.body.title;
    const wn = req.body.wn;
    const content = req.body.content;
    const standard = req.body.standard;
    const privacy = req.body.privacy;
    const accelerator = req.body.accelerator;
    const webMeta = req.body.webMeta;
    const url = (process.env.MAINAPI_URL || 'http://localhost:3000') + '/p/grewtaleplus';
    //console.log(obj, file_type, accelerator, userId, wn,  primitive_id, title,  content, standard, privacy);
    axios
      .post(url, {
        obj,
        accelerator,
        file_type,
        userId,
        wn,
        primitive_id,
        title,
        content,
        standard,
        privacy,
        webMeta,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.json({ msg: 'Error', id: 0 });
      });
  },
};
