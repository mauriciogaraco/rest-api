
const jwt = require('jsonwebtoken');

const validateJWT =(req, resp ,next)  => {
const token = req.header('x-token');
if(!token){
    return resp.status(401).json({
        msg:'Unauthorized , no token'
    })
}
 try {
   const {uid} =  jwt.verify(token, process.env.PUBLICKEY);
   req.uid = uid;
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