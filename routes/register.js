const express=require('express');
const { response } = require('../app');
const router=express.Router();
const Users=require('../models/Users');

router.post('/',(req,res,next)=>{
  console.log(req.body);
    const {name,branch,email,mobile,password,cpassword,admin}=req.body;
    
   if(!name ||!branch || !email || !mobile || !password || !cpassword) {
    return res.status(400).json("Please enter all details");
   }

   if(!admin) admin=false;

  Users.findOne({email:email})
  .then((user)=>{
       if(user){
        return res.status(400).json("User already exists.");
       }
       if(password != cpassword){
        return res.status(400).json("Invalid information.");
       }
       const us=new Users({name,branch,email,mobile,password,cpassword,admin });
      
     us.save().then((user)=>{
     res.redirect('home');
      
     }).catch((err)=>{console.log(err);})
     
  }).catch((err)=>{console.log(err);})
     
});

router.get('/',(req,res,next)=>{
  res.render('register');
})
   
   module.exports = router;

