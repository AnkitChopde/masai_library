
var jwt = require('jsonwebtoken');

// user Authorization middleware

const verifyToken = (req,res,next)=>{
    
    const token = req.headers.authorization
 
    if(token){
        let decoded = jwt.verify(token, 'masai_library');
        console.log(decoded)
        res.send("you are in middleware")
        next()
    }
}

module.exports=verifyToken