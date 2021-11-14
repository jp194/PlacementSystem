var express = require('express');
const Users = require('../models/Users');
var router = express.Router();


/* GET users listing. */

const middleware= (req,res,next) =>{
   console.log("Please wait configuring system");
   next();
};

router.get('/', middleware, function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
