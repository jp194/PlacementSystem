const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const companySchema=new Schema({
     name:{
         type:String,
         required:true
     },
     eligibility:{
        type:String,
        required:true
    },

     description:{
        type:String,
        required:true
     },

     form:{
        type:String,
        required:true
     },

     img:{
        type:String,
        required:true
     },

     lastDate:{
        type:String,
        required:true
     },
     website:{
        type:String,
        required:true
     },

     location:{
        type:String,
        required:true
     },
     salary:{
        type:String,
        required:true
     }

     
});

var Companies= mongoose.model("Company",companySchema);

module.exports=Companies;
