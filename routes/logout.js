var express=require('express');
var router=express.Router();


router.get('/',(req,res,next)=>{
    res.clearCookie('jwt');
    res.redirect('home');
})

module.exports=router;