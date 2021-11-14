const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const appliedSchema=new Schema({

    cname:{
        type:String
       
    },
     name:{
         type:String,
         required:true
     },
     tenth:{
        type:Number,
        required:true
    },
    twelveth:{
        type:Number,
        required:true
    },
    college:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
     
});

var Applied= mongoose.model("Applied",appliedSchema);

module.exports=Applied;
