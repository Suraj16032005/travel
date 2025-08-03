const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

const validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
};


router.get("/edit/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let EditList = await Listing.findById(id);
    res.render("listings/edit.ejs", { EditList });
}));

//route for showing all listings
router.get("/", wrapAsync(async (req, res) => {
    const alllistings = await Listing.find();
    console.log(alllistings);
    res.render("listings/alllistings.ejs", { alllistings });
}));

//route for deleting a particular id
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteditem = await Listing.findByIdAndDelete(id);
    console.log(deleteditem);
    res.redirect("/listings");
}));

//route for editing
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { title, description, price, location, country } = req.body.listing;
    let { id } = req.params;
    console.log("Updating with data:", req.body.listing);

    let updated = await Listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        price: price,
        location: location,
        country: country
    });
    console.log(updated);
    res.redirect(`/listings/${id}`);
}));

//route for adding a new post
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.save();
    res.redirect("/listings");
}));

//route for getting new form
router.get("/new", wrapAsync(async (req, res) => {
    console.log("new form working");
    res.render("listings/new.ejs");
}));

//route for showing details of a particular id
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let individualListing = await Listing.findById(id).populate("reviews");
    console.log("working the individual post read req");
    res.render("listings/show.ejs", { individualListing });
}));

module.exports=router;