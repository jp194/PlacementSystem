var express=require('express');
const Applied = require('../models/Applied');
var router=express.Router();


router.post('/',(req,res,next)=>{
    Applied.create(req.body)
    .then((applied)=>{
        console.log("Applied succesfully");
        res.redirect('/home');
    })
})

module.exports=router;