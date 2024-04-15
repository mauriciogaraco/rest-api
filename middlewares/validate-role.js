

const isAdminRole = (req,resp ,next) => {
  if( !req.user){
    return resp.status.json({
        msg: 'Do you want verify role whitout a token ?'
    })
  }
   const {role, name} = req.user;
   if(role !== 'ADMIN_ROLE')  {
    return resp.status(401).json({
        msg:  `${name} is not an admin - you are unauthorized`
    })
   }
   next();
}

module.exports = {
    isAdminRole
}