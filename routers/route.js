const express=require("express")
 const router= new express.Router();
const userdata=require("../models/schema")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const validateRegisterInput=require("../validator/register.js")
const auth = require("../middleware/auth.js")
const multer=require("multer")
const user_controller=require("../conttroller/usercontroller");
const admin_controller=require("../conttroller/admincontroller");
const path = require("path");

router.use(express.static('public'))



const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImage'),function(error,success){
            if (error) throw error
        });
    },
    filename:function(req,file,cb){
        const name=Date.now()+'_'+file.originalname;
        cb(null,name,function(error1,success1){
            if(error1) throw  error1
        })
    }
})
const upload= multer({storage:storage});

router.post('/register',upload.single('image'),user_controller.register_user)
//router.post('/admin/register',admin_controller.register_user)


router.post('/login',user_controller.user_login)
//router.post('/admin/login',admin_controller.admin_login)

//router.get('/admin/users/:adminId',admin_controller.userList)



router.post('/test',auth,function(req,res){

    res.status(200).send({success:true,msg:"authenticated"})
})


//individual
router.get("/check/:id",async(req,res)=>{
    try {
        const _id =req.params.id;
        const studentData = await userdata.findById(_id);
        res.send(studentData);

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }
    } catch (error) {
        res.send(error)
    }
})


// update by id
router.patch("/update/:id",async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateStudedents = await userdata.findByIdAndUpdate(_id,req.body);
        res.send(updateStudedents);
    } catch (error) {
        res.status(404).send(error);
    }
})




module.exports=router;