const jwt = require('jsonwebtoken');

const auth= (req,res,next)=>{
   
    const token=req.cookies.jwt;

    if(!token){
        res.render('login');
    }else{
       
        try{
        const tk=jwt.verify(token, process.env.secretKey);
        next();
        }catch(err){
            return res.status(401).send("Invalid Token");
        }
    }
}

module.exports=auth;