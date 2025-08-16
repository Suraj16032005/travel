const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const {isOwner}= require("../middleware.js");
const {validateListing}= require("../middleware.js");
const listingController=require("../controller/listing.js");

router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, wrapAsync(listingController.newListing));

router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.renderEditListing))
  .get(wrapAsync(listingController.showListing));

router.get("/edit/:id", isLoggedIn, isOwner, wrapAsync(listingController.updateListing));

module.exports=router;