const mongoose= require("mongoose");


mongoose.connect("mongodb+srv://gaurav12:Gaurav12@cluster0.wx2cuxc.mongodb.net/test",{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(()=>{                                            //proise
    console.log("connection is sucessfully..");
}).catch((e)=>{
    console.log("connection error",e);
})         
