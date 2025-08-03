const express = require("express"); ///used for parsing, giving responses
const app = express();  // Ye function:
const mongoose = require("mongoose");
const methodOverride = require("method-override");
app.use(methodOverride("_method")); // jab bhi post ka put ya delete karvana ho tab
const ExpressError=require("./utils/ExpressError.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/travel');
}

const path = require("path");
const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));//parsing ke liye
app.use(express.static(path.join(__dirname, "/public"))); //public me sari files hai
const port = 8080;
//root page
app.get("/", (req, res) => {
    res.send("root is also working");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});

//error handling middleware
app.use((err,req,res,next)=>{
    let{statusCode=500, message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs", {message});
});

app.listen(port, (req, res) => {
    console.log("working");
});
