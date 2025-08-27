const path = require('path');
const multer = require('multer');

module.exports = {

upload :  multer({
	storage :  multer.diskStorage({
		
			destination :(req, file, cb) => {
			console.log(file);
				if(file.fieldname === 'photos'){
                    return  cb(null, `${globalThis.mediaDirectory}/grewtales/images`)
				}else{
					if(file.mimetype === 'video/mp4'){
						return  cb(null, `${globalThis.mediaDirectory}/grewtales/videos`)
					}else{
                        return  cb(null, `${globalThis.mediaDirectory}/grewtales/thumbnails`)
					}
				}
			},
			
	filename : (req, file, cb) => {
		var extention = file.mimetype.split('/')[1]; 
		return cb(null, `${req.userData.userId}ASB_5454_${Date.now()}.${extention}`)
	}
	}),	})};