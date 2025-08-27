
const multer = require('multer');
const axios = require('axios').default;

module.exports = {

 async profilepic (req, res){
	
    var userId = req.userData.userId;
	var profilepic = req.files.avatar[0].filename;
	console.log(userId, profilepic);	 
	
	
	 axios.post('http://localhost:3000/upload/profilepic', { userId, profilepic })
  .then(response => {
    
    res.json(response.data);
  })
  .catch((error) => {
    
    res.json({msg : 'Error'});
  })
 
 
	
	
	
	
	
	
	}



}