const {Schema,model} = require('mongoose');

const SupportSchema = Schema({
    name:{
       type:String,
       require:true, 
    },
    description:{
        type:String,
        require:true, 
     }
})
module.exports = model('Support',SupportSchema)