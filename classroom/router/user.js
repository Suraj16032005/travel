const express=require("express");
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("users get is working");
});

router.post("/",(req,res)=>{
    res.send("users post is working");
});

router.delete("/",(req,res)=>{
    res.send("users delete is working");
});


module.exports = router;