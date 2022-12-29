const express =require('express');
const app= express();
require("./db/conn");
const studentRouter=require("./routers/route");
const Student =require ("./models/schema");
const adminRouter=require("./routers/admin");

const port =process.env.PORT ||8000;

app.use(express.json())
app.use(studentRouter);
app.use(adminRouter);


app.listen(port,()=>{
    console.log(`connection sucess at ${port}`);
})