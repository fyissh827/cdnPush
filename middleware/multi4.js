const path = require('path');
const multer = require('multer');

module.exports = {

upload :  multer({
	storage :  multer.diskStorage({
		
			destination :(req, file, cb) => {
				
				if(file.mimetype === 'image/webp'){
                    return  cb(null, `${globalThis.mediaDirectory}/chat/image`)
					v
				}else{
					return  cb(null, `${globalThis.mediaDirectory}/chat/audio`)
				}
			},
	filename : (req, file, cb) => {
		var extention = file.mimetype.split('/')[1];
		return cb(null, `${req.userData.userId}ASB_3232_${Date.now()}.${extention}`)
	}
	}),	})};