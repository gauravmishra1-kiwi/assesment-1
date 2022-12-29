const mongooes= require("mongoose");
const validator=require("validator");
const { boolean } = require("webidl-conversions");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")

const userSchema=new mongooes.Schema({
    name : {
        type:String,
        required:true,
        // min:3,
        // max:20
    },
    email : {
        type:String,
        required:true,
        unique:[true,"Email is already present"],
        // validate(value){
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Invalid Email")
        //     }
        // }

    },
    phone : {
        type:Number,
        required:true,
    },
   address : {
    type:String,
    required:true,
    // min:10,
    // max:50,
   },
   password:{
    type:String,
    required:true
   },
   image:{
    type:String,
    required:true
   },
   type:{
    type:String,
    default:0
   },
   active:Boolean

//    tokens:[{
//     token:{
//         type:String,
//         required:true
//     }
//    }]
})





const userdata=new mongooes.model("userdetails",userSchema); 

module.exports =userdata;