
const Model = require('./model/index');
module.exports = {

async me(req, res){
	const payload = {
  id : req.userData.userId
  };
	
const _model = await  Model.me(payload);
   
   res.json({
      "msg": "you are accessed.",
      profile: _model.output[0],
    
    });
 
  
}



}