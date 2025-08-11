const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const {isOwner}= require("../middleware.js");
const {validateListing}= require("../middleware.js");
const listingController=require("../controller/listing.js");

router.get("/edit/:id", isLoggedIn, isOwner, wrapAsync(listingController.updateListing));

//route for showing all listings
router.get("/", listingController.index);

//route for deleting a particular id
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//route for editing
router.put("/:id", isLoggedIn,isOwner, validateListing, wrapAsync(listingController.renderEditListing));

//route for adding a new post
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.newListing));

//route for getting new form
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

//route for showing details of a particular id
router.get("/:id", wrapAsync(listingController.showListing));

module.exports=router;