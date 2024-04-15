const {Schema,model} = require('mongoose');

const TicketSchema = Schema({
    title:{
        type:String,
        required:[true, 'title is required'], 
       
     },
    username:{
       type:String,
       required:[true, 'username is required'], 
      
    },
   email:{
    type:String,
    required: [true, 'Email is required'],
   },
   description:{
    type:String,
    required: [true, 'Description is required']
   },
   category:{
    type:String,
    required: [true, 'Category is required']
   },
   status:{
    type: String,
    emun:['COMPLETED', 'UNCOMPLETED'],
    default:'UNCOMPLETED'
   },
   state:{
   type: Boolean,
   default:true,
   require:true
   },
   user:{
    type: Schema.Types.ObjectId,
    ref:'User'
   }
  
});
TicketSchema.methods.toJSON = function() {
    const {__v,state, ...ticket} = this.toObject();
    
    return ticket;
 }

module.exports = model('Ticket',TicketSchema);
