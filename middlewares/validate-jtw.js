
const jwt = require('jsonwebtoken');
const User = require('../src/models/User')

const validateJWT = async(req, resp ,next)  => {
const token = req.header('x-token');
if(!token){
    return resp.status(401).json({
        msg:'Unauthorized , no token'
    })
}
 try {
   const {uid} =  jwt.verify(token, process.env.PUBLICKEY);

   const user = await User.findById(uid);

   if (!user){
    return resp.status(401).json({
        msg: 'Invalid token - user not find in BD'
    })
   }

   if (!user.state){
    return resp.status(401).json({
        msg: 'Invalid token - user.state: false'
    })
   }
  /* if (user.role !== 'ADMIN_ROLE'){
    return resp.status(401).json({
        msg: 'User is not admin'
    })
   }*/

   req.user = user;
   next();
 } catch (error) {
    console.log(error);
    resp.status(401).json({
        msg:'Invalid token'
    })
 }

}
module.exports={
    
    validateJWT
}