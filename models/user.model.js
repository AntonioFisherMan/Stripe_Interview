const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const Schema=mongoose.Schema;

const userSchema=new Schema({
   name:{
     type:String,
     required:true,
     unique:true
   },
   email:{
     type:String,
     required:true,
     unique:true
   },
   password:{
     type:String,
     required:true,
     unique:true
   },
   rememberMe:{
   type:Boolean
   }
   
}); 



const User=mongoose.model('User',userSchema)
module.exports=User;