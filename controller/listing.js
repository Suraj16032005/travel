const Listing=require("../models/listing");

module.exports.index= async (req, res) => {
    const alllistings = await Listing.find();
    console.log(alllistings);
    res.render("listings/alllistings.ejs", { alllistings });
};

module.exports.renderNewForm= async (req, res) => {
    console.log("new form working");
    res.render("listings/new.ejs");
};

module.exports.showListing= async (req, res) => {
    let { id } = req.params;
    let individualListing = await Listing.findById(id).populate({path: "reviews", populate : {path:"author"}}).populate("owner");
    if(!individualListing){
        req.flash("error", "the item u want to access is deleted!");
        res.redirect("/listings");
    }
    console.log(individualListing);
    res.render("listings/show.ejs", { individualListing });
};

module.exports.newListing= async (req, res, next) => {
    const listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","A new listing has been created!");
    res.redirect("/listings");
};

module.exports.renderEditListing=async (req, res) => {
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
};

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let EditList = await Listing.findById(id);
    if(!EditList){
        req.flash("error", "the item u want to access is deleted!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { EditList });
};

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let deleteditem = await Listing.findByIdAndDelete(id);
    console.log(deleteditem);
    req.flash("success","Deleted a Listing!");
    res.redirect("/listings");
};