const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user.js");

router.get("/signup", userController.renderSignUpForm);

router.post("/signup", saveRedirectUrl, wrapAsync(userController.signUp));

router.get("/login", userController.renderLoginPage);

router.post("/login", saveRedirectUrl, passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
}), userController.login
);

router.get("/logout", userController.logout);

module.exports=router;