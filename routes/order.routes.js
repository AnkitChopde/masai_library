

const express = require("express");
const OrderModel = require("../models/order.model");

const orderRouter= express.Router();

// get request for book orders data

orderRouter.get("/order",async(req,res)=>{
    try{
        const books = await OrderModel.find();
        res.status(200).send({
            msg:"order Books Data",data:books
        })
    }
    catch(err){
        res.status(400).send({
            msg:"error while getting order data"
        })
    }
    
});

// post request of adding data to database

orderRouter.post("/orders",async(req,res)=>{

    try{
        const book = await OrderModel.insertMany(req.body);
        await book.save
        res.status(201).send({
            msg:"order Data added to the database Successfully!"
        })
    }
    catch(err){
        res.status(400).send({
            msg:"error while posting order data"
        })
    }   
});

module.exports=orderRouter