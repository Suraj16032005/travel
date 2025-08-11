const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const {isOwner}= require("../middleware.js");
const {validateListing}= require("../middleware.js");

router.get("/edit/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let EditList = await Listing.findById(id);
    if(!EditList){
        req.flash("error", "the item u want to access is deleted!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { EditList });
}));

//route for showing all listings
router.get("/", wrapAsync(async (req, res) => {
    const alllistings = await Listing.find();
    console.log(alllistings);
    res.render("listings/alllistings.ejs", { alllistings });
}));

//route for deleting a particular id
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteditem = await Listing.findByIdAndDelete(id);
    console.log(deleteditem);
    req.flash("success","Deleted a Listing!");
    res.redirect("/listings");
}));

//route for editing
router.put("/:id", isLoggedIn,isOwner, validateListing, wrapAsync(async (req, res) => {
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
    req.flash("success","Updated data!");
    res.redirect(`/listings/${id}`);
}));

//route for adding a new post
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","A new listing has been created!");
    res.redirect("/listings");
}));

//route for getting new form
router.get("/new", isLoggedIn, wrapAsync(async (req, res) => {
    console.log("new form working");
    if(!req.isAuthenticated()){
        req.flash("error", "Please login");
        res.redirect("/login");
    }
    res.render("listings/new.ejs");
}));

//route for showing details of a particular id
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let individualListing = await Listing.findById(id).populate({path: "reviews", populate : {path:"author"}}).populate("owner");
    if(!individualListing){
        req.flash("error", "the item u want to access is deleted!");
        res.redirect("/listings");
    }
    console.log(individualListing);
    res.render("listings/show.ejs", { individualListing });
}));

module.exports=router;