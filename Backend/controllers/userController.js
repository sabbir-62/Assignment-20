const userData = require('../models/userModel')


//Write a getUser function ans send response with user Data
exports.getUser = ((req, res, next) => {
   try{
    res.status(200).send({
        userData
    })
   }
   catch(err){
    res.send(err)
   }
})