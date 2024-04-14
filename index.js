const express = require("express");
 require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');

const questionRouter = require('./src/routes/questionRouter');
const authRouter = require('./src/routes/authRouter');
const cors = require('cors');

const {dbConnetion, PORT} = require('./dataBase/config')




//crear el servidor
const app = express();

//base de datos 
dbConnetion();
app.use(cors());

app.use(express.json());

const port = PORT || 4000;


app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`)
});



app.use('/', userRoutes);
app.use('/', questionRouter);
app.use('/', authRouter);


