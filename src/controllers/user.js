const {response,request} = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/User');
const { generateJWT } = require('../../middlewares/generateJWT');


const register = async(req,resp = response)=>{

 try {
       const {name,email,password,role} = req.body;
      const user = new User({name, email, password, role})

      //Verificar si el usuario existe 
      const areEmail = await User.findOne({email});

      if (areEmail){
       return resp.status(400).json({
        msg: 'Thi email is alredy register'
       })
      }

      //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync(); 
      user.password = bcryptjs.hashSync(password, salt);

        //guardar en BD
      await  user.save();

        resp.json({
         user
        })
 } catch (error) {
    console.log(error);
    resp.status(500).json({
        ok: false,
        messge:'consulta al admin'
    })
 }
 
}
const login = async(req ,resp = response)=>{
    const {email, password} = req.body;
    try {
        //Verificar si el correo existe 
        const currentUser = await User.findOne({email});

        if (!currentUser){
         return resp.status(400).json({
          msg: 'The email/password is invalid -email'
         })
        }
        //Si el usuarios está activo 

        if ( !currentUser.state ){
         return resp.status(400).json({
          msg: 'The email/password is invalid -status:false'
         })
        }
        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, currentUser.password);

        if ( !validPassword){
            return resp.status(400).json({
             msg: 'The email/password is invalid -password'
            })
           }
        //Generar el jwt
        const token = await generateJWT(currentUser.id)
   
     
           resp.json({
           currentUser,
           token
           })
    } catch (error) {
       console.log(error);
       resp.status(500).json({
           ok: false,
           messge:'consulta al admin'
       })
    }
    

   }
const getTask = (req,resp = express.response)=>{
    (req,resp)=>{
        resp.send("hello World!")
    }
    
}
const getAllUser = async(req,resp = express.response)=>{
const {limit=5} = req.query;
//const users = await User.find({state:true}).limit(Number(limit));

//const totalItems = await User.countDocuments({state:true})

const [total, items] = await Promise.all([
    User.countDocuments({state:true}),
    User.find({state:true}).limit(Number(limit))
]);
 
resp.json({
    total,
    items
   // totalItems,
  //  users
})
    
}
const updateUser = async(req,resp = express.response)=>{
   
    const {id} = req.params;

    const { uid, password, google, email, ...resto} = req.body;
    // const { _id, password, google, email, ...resto} = req.body;
   //validar contra la bd
   const user = await User.findByIdAndUpdate(id, resto);

   resp.json({
    msg: 'User has been update',
    user
   })
}
const deleteUser = async(req,resp = express.response)=>{
   
    const {id} = req.params;
  
    const user = await User.findByIdAndUpdate(id,{state: false})
    
    resp.json({
        msg: 'User has been delete',
        user
    })
}
module.exports = {
  register,
  getTask,
  login,
  deleteUser,
  updateUser,
  getAllUser
}