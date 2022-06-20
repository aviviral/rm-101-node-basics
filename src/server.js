// install and import express
const mongoose=require("mongoose")
const express = require("express")
const path = require('path');
let app = express();

// Code here

const userSchema=new mongoose.Schema(
    {
        first_name: {type:String,required:true},
        last_name: {type:String,required:true},
        email: {type:String,required:true},
        gender: {type:String,required:true},
        ip_address: {type:String,required:true},
        age: {type:Number,required:true}
    },
    {
        timestamps:true,
        versionkey:false
    })
const User=mongoose.model("user",userSchema)

app.get("/",async(req,res)=>{
    try {
      return res.sendFile(path.join(__dirname, './assets/users.html'));
    } catch (error) {
        return res.status(404).send({message:error.message}) 
    }
})

app.get("/user",async(req,res)=>{
    try {
       const users=await User.find().lean().exec()
       return res.status(200).send(users) 
    } catch (error) {
        return res.status(404).send({message:error.message})   
    }
})
app.get("/user:id",async(req,res)=>{
    try {
        const user=await User.findById(req.params.id).lean().exec()
        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(404).send({message:error.message})  
    }
})
app.post("/user",async(req,res)=>{
    try {
        const user=await User.create(req.body)
        return res.status(200).send(user) 
    } catch (error) {
        return res.status(404).send({message:error.message})   
    }
})

app.listen(8000,()=>{
    console.log("listening to port 8000")
})
// Note: Do not remove this export statement
module.exports = app;
