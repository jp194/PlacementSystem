var express=require('express');
const Companies = require('../models/Companies');
var router=express.Router();
var auth=require('../middleware/auth.js');
const Users = require('../models/Users');
const Applied = require('../models/Applied');
const nodemailer=require('nodemailer');
var app=require('../app');

var ejs=require('ejs');

router.get('/',auth,(req,res,next)=>{
    Companies.find({})
    .then((companies)=>{
     // extract payload(_id) from jwt token stored in cookies.
    const base64url = req.cookies.jwt.split(".")[1]; // the jwt token consists of 1)header 2) payload 3)signature seprated by dots 
    
    // now convert the base64 encoded payload to json object 
    const decodedValue= JSON.parse( Buffer.from(base64url, 'base64'));
     
    // extract _id from payload object.
    console.log(decodedValue._id);
     
    Users.findById(decodedValue._id)
    .then((user)=>{
        res.render('home',{companies: companies,user:user});
    })
    .catch((err)=>{

    })
   
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.get('/:id',(req,res,next)=>{
   
    Companies.findById(req.params.id)
    .then((company)=>{
        console.log(company.name);    
        res.render('company',{company: company});
        })
    .catch((err)=>{
        console.log(err);
    })
})


router.get('/delete/:id',(req,res,next)=>{
    Companies.findByIdAndRemove(req.params.id)
    .then((company)=>{
        res.redirect('/home'); 
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/generate/:name',(req,res,next)=>{
    var passed=[];
    Applied.find({"cname":req.params.name})
    .then((list)=>{
        list.filter((item)=>{
            if(item.tenth>=60 && item.twelveth>=60 &item.college>=60){
                passed.push(item);
            }
        })

       ejs.renderFile(__dirname+ '/test.ejs',{passed:passed})
       .then((body)=>{
        let mailTransporter = nodemailer.createTransport({
            service: "Outlook365",
  
            auth: {
                user: 'tpo.medicaps@outlook.com',
                pass: 'medi@pass'
            }
        });
          
        let mailDetails = {
            from: 'tpo.medicaps@outlook.com',
            to: 'jenil.p194@gmail.com',
            subject: 'Medicaps University Placement drive',
            html: body,
        };
          
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent successfully');
            }
        });
       }).catch((err)=>{console.log(err)})

        res.redirect('/home');
    }).catch((err)=>{console.log(err)});
    
})

router.get('/viewStudents/:name',(req,res,next)=>{
   
    Applied.find({"cname":req.params.name})
    .then((list)=>{
        res.render('viewStudents',{list:list});
       }).catch((err)=>{console.log(err)})

  
})
module.exports=router;