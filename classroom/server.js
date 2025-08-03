const express=require("express");
const app=express();
const users=require("./router/user.js");
const cookieParser=require("cookie-parser");
const session=require("express-session");

app.use(session({secret : "mysecretmessage", resave:false, saveUninitialized:true}));

app.get("/test",(req,res)=>{
    res.send("wokrig test properly");
});

app.listen(3000, (req,res)=>{
    console.log("listing o port 3000");
});