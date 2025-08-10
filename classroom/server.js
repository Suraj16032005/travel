const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");

const sessionOptions=session({secret : "mysecretmessage", resave:false, saveUninitialized:true});
app.use(sessionOptions);

app.get("/test",(req,res)=>{
    res.send("wokrig test properly");
});

app.listen(3000, (req,res)=>{   
    console.log("listing o port 3000");
});