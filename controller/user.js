const User=require("../models/user.js");

module.exports.signUp=async (req,res)=>{
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
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});
    } catch(e){
      req.flash("error", e.message);
      res.redirect("/signup");
    }
};


module.exports.renderSignUpForm= (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginPage=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logout done successfully");
        res.redirect("/listings");
    });
};

module.exports.login = (req,res)=>{
  req.flash("success","you are logged in!");
  let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};