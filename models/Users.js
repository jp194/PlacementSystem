const mongoose=require('mongoose');
const validator=require('validator');
const bycrpt=require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema=new Schema({
    name:{
      type:String,
      required:true 
    },
    branch:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        validate:{
           validator: validator.isEmail,
           message:' {value} is not a valid email '
        }
    },
    mobile:{
      type:String,
      required:true,
      validate:{
        validator: validator.isMobilePhone,
        message:' {value} is not a valid mobile '
     }
    },
    
    password:{
        type:String,
        required:true
    },

    cpassword:{
        type:String,
        required:true
    },

    admin:{
        type:Boolean,
        default:false
    }
    
});

UserSchema.pre('save', async function(next){

    if(this.isModified('password')){
        this.password=await bycrpt.hash(this.password,12);
        this.cpassword=await bycrpt.hash(this.cpassword,12);
    }
    next();
})


var Users= mongoose.model('User',UserSchema);

module.exports=Users;