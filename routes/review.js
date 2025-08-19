const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor}= require("../middleware.js");
const  reviewController  = require("../controller/review.js");

//route for post a review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports=router;