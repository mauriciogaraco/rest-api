const {response,request} = require('express')

const Issue = require('../models/SupportModel')

const login = async(req ,resp = response)=>{
 try {
      // const {name,description} = req.body;
      const issue = new Issue(req.body)
      await  issue.save();
        resp.status(201).json({
            ok:true,
            messge: "login ok",
           
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
module.exports = {
  login
}