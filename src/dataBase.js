const mongoose = require('mongoose');
const DB_URI ='mongodb://localhost:127.0.0.1/support-crud'

/*(async()=>{
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/support-crud");
        console.log('db conected to'+ db.Connection.name)
    } catch (error) {
       console.log(error) 
    }
})();
*/
/*module.exports = () => {
    const connect = () =>{
        mongoose.connect(
            DB_URI, {keepAlive: true, useNewUrlParser:true, useUnifiedTopology:true},
            (err)=>{
                if(err){
                    console.log('Db error');
                }
                else{
                    console.log('conexión correcta')
                }
            }
        )
    }
    connect();
}*/
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_URI, {keepAlive: true, useNewUrlParser:true, useUnifiedTopology:true}) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }
    module.exports = connectToMongo;