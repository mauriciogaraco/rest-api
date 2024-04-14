
const isEmailValid = async(email = '') => {
 //Verificar si el correo existe 
 const currentUser = await User.findOne({email});

 if (!currentUser){
  return resp.status(400).json({
   msg: 'The email/password is invalid -email'
  })
 }
}

const isUserById = async(id) => {
    //Verificar si el correo existe 
    const existingUser = await User.findById(id);
     console.log( 'existingUser' +existingUser)
    if ( !existingUser){
    throw new Error (`el id no existe :${id}`);
    }
   }
   module.exports ={
    isUserById
   }