const Student=require("../models/schema")
const bcrypt = require('bcryptjs')
const { model } = require("mongoose");
const config=require("../config/config")
const jwt=require("jsonwebtoken");
const userdata = require("../models/schema");
const { authSchema } = require("../validator/validate_schema");


const create_token=async(id)=>{
    try {
       const token=await jwt.sign({id:id},config.secret_jwt);
        return token           
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const securepasword=async(password)=>{
    try {
        const passwordHash=await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {
        return false
    }
}
const register_user=async(req,res)=>{
   
    try {

        const spassword=await securepasword(req.body.password);

       const user= new Student({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:spassword,
            image:req.file.filename,
            type:req.body.type,
            token:req.body.token
        })
        // const result=await authSchema.validateAsync(req.body)

        const userData= await Student.findOne({email:req.body.email});
        if (userData) {
            res.status(200).send({sucess:false,msg:"this email alrady exits"});
                
        }
         else {
            const user_data=await user.save();
            res.status(200).send({sucess:true,data:user_data});
        }
    } catch (error) {
        res.status(400).send(error.message);
    
    }
}

//login method

const user_login = async (req, res) => {
    try {
        
        const email=req.body.email;
        const password=req.body.password;
        const userDAta = await Student.findOne({ email:email });
        
        if (userDAta) {
            const passwordMatch = await bcrypt.compare(password, userDAta.password);
            
            if (passwordMatch) {
               const tokenData=await create_token(userDAta._id);
                console.log(tokenData);
                const userResult = {
                    _id: userDAta._id,
                    name: userDAta.name,
                    phone: userDAta._phone,
                    address: userDAta.address,
                    password: userDAta.password,
                    image: userDAta.image,
                    type: userDAta.type,
                     token:tokenData
                }
                const responce = {
                    success: true,
                    msg: "login details of user",
                    data: userResult
                }
                res.status(200).send(responce)
            }
            else {
                res.status(400).send("login incorrect ")
            }
        }
    }
    catch(err){
        console.log("invalid email", err);
    }
    
}


const userList = async (req, res) => {
    try {
        
        const {params} = req;
        console.log('params :>> ', params);
        const userDAta = await Student.findOne({ _id:params.adminId });
        console.log("sdf", userDAta);
        if (userDAta.isAdmin == false) {
            return res.send("user is not authorised")
        }else {
            return res.send("user is authorised")
        }
           
    }
    catch(err){
        console.log("invalid email", err);
    }
    
}


module.exports={
    register_user,
    user_login,
    userList
}