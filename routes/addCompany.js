var express=require('express');
const Companies = require('../models/Companies');
var router=express.Router();


router.get('/',(req,res,next)=>{
    res.render('addCompany');
})

router.post('/',(req,res,next)=>{
   Companies.create(req.body)
   .then((company)=>{
       res.status(200);
   })
   .catch((err)=>{
       console.log(err)
   })

   res.redirect('/home');
}) 

module.exports=router;