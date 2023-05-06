
const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

var jwt = require('jsonwebtoken');
const userRouter = express.Router();

userRouter.get("/",(req,res)=>{
    res.send("user login")
})

userRouter.post("/register",async(req,res)=>{

    const {email,name,password,isAdmin} = req.body
    console.log(email,password)
    let check =await UserModel.findOne({email})
    console.log(check)
    if(!check){
            const hash = bcrypt.hashSync(password, 5);
               let user = await UserModel.insertMany({...req.body,password:hash})
               await user.save;
               res.status(201).send("User register successfully!")
    }else{
        res.status(400).send("User already registered!, please login!")
    }     
        
});

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    let check =await UserModel.findOne({email})
    
   if(email&&password){
    if(check){
        const match = await bcrypt.compare(password, check.password)
        const token = jwt.sign({ expiresIn: '1h' }, 'masai_library');
          if(match){

            res.status(201).send({
                msg:"User Logged In successfully!","token":token,"userId":check._id
               })
          }
          else{
            res.status(400).send({
                msg:"Password is Incorrect!"
               })
          }
    }else{
    res.status(400).send({
        msg:"User is not registered! please register first"
    })
    }     
   }else{
    res.status(400).send({
        msg:"Invalid Credentials!"
    })
   }
})
module.exports=userRouter