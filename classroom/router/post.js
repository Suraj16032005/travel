const express=require("express");
const router=express.Router();


app.get("/posts",(req,res)=>{
    res.send("postss get is working");
});

app.post("/posts",(req,res)=>{
    res.send("postss post is working");
});

app.delete("posts",(req,res)=>{
    res.send("posts delete is working");
});


module.exports = router;