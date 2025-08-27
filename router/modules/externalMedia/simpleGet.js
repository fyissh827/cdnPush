const https = require('https');
const http = require('http');
const fs = require('fs');

module.exports = {
    async externalMedia(req, res){
        var info2 = decodeURIComponent(req.query.url);
      console.log(info2);
        var b = info2.split(':')[0];
       
        if(b){
      if( b === 'https'){
       
       
          
  const request = https.get(info2, function(response) {
   const contentType = response.headers['content-type'];
   res.setHeader('Content-Type', contentType);
   response.pipe(res); 
  
  });
      }else{
       
        
          
   request = http.get(info2, function(response) {
    contentType = response.headers['content-type'];
   res.setHeader('Content-Type', contentType);
   response.pipe(res); 
  
  });
      }
        }
    }
}