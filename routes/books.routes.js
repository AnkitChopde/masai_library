const express = require("express");
const UserModel = require("../models/user.model");
const BookModel = require("../models/books.model");
const verifyToken = require("../middlewares/verifyToken.middleware");

const bookRouter= express.Router();

// get request for books data

bookRouter.get("/",async(req,res)=>{


    console.log(req.query)
    try{
        // This query request should give only those books whose category and author is requested in endpoint
        let books;
        if(req.query.author&&req.query.category){
            books = await BookModel.find({"category":req.query.category,"author":req.query.author});
        }

         // This query request should give only those books whose author is requested in endpoint
        else if(req.query.author){
             books = await BookModel.find({"author":req.query.author});
        }

         // This query request should give only those books whose categoryt
        else if(req.query.category){
            books = await BookModel.find({"category":req.query.category});
        }
        
        // This will give whole books data present in the database
        else{
            books = await BookModel.find();
        }
        
        res.status(200).send({
            msg:"Books Data",data:books
        })
    }
    catch(err){
        res.status(400).send({
            msg:"error while getting data"
        })
    }
    
});

// get request for books data of particular ID 

bookRouter.get("/:id",async(req,res)=>{
    try{
        const books = await BookModel.find({_id:req.params.id});
        res.status(200).send({
            msg:"Books Data",data:books
        })
    }
    catch(err){
        res.status(400).send({
            msg:"error while getting data"
        })
    }
    
});

// post request of adding data to database

bookRouter.post("/",verifyToken,async(req,res)=>{

    try{
        const book = await BookModel.insertMany(req.body);
        await book.save
        res.status(201).send({
            msg:"Data added to the database Successfully!"
        })
    }
    catch(err){
        res.status(400).send({
            msg:"error while posting data"
        })
    }   
});

// patch request for updating the book data

bookRouter.patch("/:id",verifyToken,async(req,res)=>{
   
    try{
        await BookModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(204).send({
            msg:`Data of bookId ${req.params.id}  updated Successfully!`
        })


    }
    catch(err){
        res.status(400).send({
            msg:"error while posting data"
        })
    }
})

// delete request for deleting the particular book data

bookRouter.delete("/:id",verifyToken,async(req,res)=>{
   
     try{
         await BookModel.findByIdAndDelete(req.params.id);
         res.status(202).send({
             msg:`Data of bookId ${req.params.id}  deleted Successfully!`
         })
 
 
     }
     catch(err){
         res.status(400).send({
             msg:"error while deleting data"
         })
     }
 })

module.exports=bookRouter

// "title": "rich Dad",
// "author": "robert",
// "category": "fiction",
// "price": 500,
// "quantity": 1