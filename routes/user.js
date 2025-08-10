const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", saveRedirectUrl, wrapAsync(async (req,res)=>{
    try{
        let {email, username, password}= req.body;
    let newUser= new User({
        email: email,
        username: username
    });
    let registeredUser= await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=> {
     if (err) {
     return next(err); 
    } 
   req.flash("success","welcome to travel website!");
    res.redirect(res.locals.redirectUrl);
});
    } catch(e){
      req.flash("error", e.message);
      res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
}),
(req,res)=>{
  req.flash("success","you are logged in!");
  let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
);

router.get("/logout", (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logout done successfully");
        res.redirect("/listings");
    });
});

module.exports=router;