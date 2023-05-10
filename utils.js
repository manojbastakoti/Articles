const jwt = require('jsonwebtoken');
const fs=require("fs");
const path=require("path");

module.exports={
    createToken :function(payload){
        const token = jwt.sign({payload},process.env.JWT_TOKEN,{expiresIn:"1h"});
        return token;
    },
    verifyToken:function(token){
        const decoded=jwt.verify(token,process.env.JWT_TOKEN);
        return decoded;
    },
    imageValidation:function(mimeType,res){
        if(!mimeType.startsWith("image")){
            res.json({
                success:false,
                message:"Invalid file type!"
            });
            return false;
        }

        return true;

    },
    uploadImage:function(dir,imageFile){
        const hashedFilename = imageFile.md5;
        const extension = path.extname(imageFile.name);
        if(!fs.existsSync("uploads")){
            fs.mkdirSync("uploads");
        }
        const imageFileName=hashedFilename + extension;
        imageFile.mv(dir +"/"+imageFileName, function(err){
            if(err){
                console.log(err);
                res.json({
                    success:false,
                    message:"Something went wrong!"
                });
            }
            
        });
        return imageFileName;
    },
};