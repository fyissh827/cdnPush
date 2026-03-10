const multer = require('multer');
const axios = require('axios').default;
const centralApi = require('../../../externalCalls/index');

module.exports = {
  async profilepic(req, res) {
    try {
      const userId = req.userData.userId;
      const profilepic = req.files.avatar[0].filename;

      const response = await centralApi.post(
        '/upload/profilepic',
        { userId, profilepic }
      );

      res.json(response);
    } catch (error) {
      console.error(error.message);
      res.json({ msg: 'Error' });
    }
  },
};
