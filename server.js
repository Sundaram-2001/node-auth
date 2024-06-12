const express=require("express");
const app=express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("test");
})
app.post("/register",(req,res)=>{
    const {firstName, lastName,email,password}=req.body;
    console.log({firstName,lastName,email,password});
    try {
        if(!(firstName && lastName && email && password)){
            res.status(400).send("Kindly pass valid request body!")
        }
    } catch (error) {
        console.error(error);
    }
})
app.listen(8080,()=>{
    console.log("Server started ...");
})