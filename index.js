
const express =require("express");
require('dotenv').config()
const connection = require("./configs/db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/books.routes");
const orderRouter = require("./routes/order.routes");
const app = express();


app.use(express.json());
app.use("/user",userRouter)
app.use("/books",bookRouter);


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to database")
    }
    catch(err){
        console.log(`error while connecting to database`)
    }
    console.log("connected to server",process.env.port)
})