const {response,request} = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/User');
const { generateJWT } = require('../../middlewares/generateJWT');
const Ticket = require('../models/Ticket');


const createTicket = async(req,resp = response)=>{

 try {
       const {username,email,category,title,description} = req.body;
   //   

      //Verificar si el usuario existe 
      const areTitle = await Ticket.findOne({title});

      if (areTitle && areTitle.username === username){
       return resp.status(400).json({
        msg: 'This ticket is arlredy register'
       })
      }
       
      const data = {
        username,
        title,
        email,
        description,
        category,
        user: req.user._id
      }
      const ticket = new Ticket(data)
        //guardar en BD
      await  ticket.save();

        resp.status(201).json({
        
         ticket
        })
 } catch (error) {
    console.log(error);
    resp.status(500).json({
        ok: false,
        messge:'consulta al admin'
    })
 }
 
}
  // get user tickets

const getTickets = async(req,resp = express.response)=>{

    const {limit=10} = req.query;

// Obtener el ID del usuario autenticado desde el token JWT
const userId = req.user._id;

const [total, items] = await Promise.all([
    Ticket.countDocuments({user: userId}),
    Ticket.find({user: userId})
    
    .limit(Number(limit))
]);
resp.json({
    total,
    items
})
    
}
   //get ticket by id

const getTicketById = async(req,resp = express.response)=>{
    
    const {id} = req.params;

    const ticket = await Ticket.findById(id).populate('user','name');


resp.json({
    ticket
})
    
}
   //get All Tickets
const getAllTickets = async(req,resp = express.response)=>{
const {limit=10} = req.query;


const [total, items] = await Promise.all([
    Ticket.countDocuments({state:true}),
    Ticket.find({state:true}).limit(Number(limit))
    .populate('user', 'name')
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
        user,
      
    })
}
module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  getAllTickets
}