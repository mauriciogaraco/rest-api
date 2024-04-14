const mongoose = require('mongoose');

const PORT =4000;

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
    dbConnetion,
    PORT
}