const mongoose = require('mongoose');

const DB_CONECTION = "mongodb+srv://mauriciogaraco:@CRACKWTF1@cluster0.01uqdzf.mongodb.net/support"

const dbConnetion =  async() => {
try {
   await mongoose.connect(process.env.DB_CONECTION)

   console.log('Base de datos online')
    
} catch (error) {
    console.log(error)
    throw new Error('Error a la hora iniciar la bd')
}
}

module.exports = {
    dbConnetion
}