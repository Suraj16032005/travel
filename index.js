
const express = require("express"); ///used for parsing, giving responses
const app = express();  //📦 Ye function:


const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); //Listing ek model/class hai jo use karenge naye documents banene me
const methodOverride = require("method-override");
app.use(methodOverride("_method")); // jab bhi post ka put ya delete karvana ho tab

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

app.get("/testlisting", async (req, res) => {
    const listing1 = new Listing({
        title: "villa da villa",
        description: "villa for the villagers",
        price: 10000,
        location: "calangute,goa",
        country: "india"
    });
    listing1.save().then((res) => {
        console.log("saved sucessfully");
        console.log(res);
    }).catch((err) => {
        console.log("error happneed");
    });
});

const port = 8080;
app.listen(port, (req, res) => {
    console.log("working");
});
app.get("/", (req, res) => {
    res.send("root is also working");
});
app.get("/listings/edit/:id", async (req, res) => {
    let { id } = req.params;
    let EditList = await Listing.findById(id);
    res.render("listings/edit.ejs", { EditList });
});

app.get("/listings", async (req, res) => {
    const alllistings = await Listing.find();
    console.log(alllistings);
    res.render("listings/alllistings.ejs", { alllistings });
});

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deleteditem = await Listing.findByIdAndDelete(id);
    console.log(deleteditem);
    res.redirect("/listings");
});

app.put("/listings/:id", async (req, res) => {
    let { title, description, price, location, country } = req.body;
    let { id } = req.params;
    let updated = await Listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        price: price,
        location: location,
        country: country
    });
    console.log(updated);
    res.redirect(`/listings/${id}`);
});

app.post("/listings", async (req, res) => {
    const listing = req.body.listing;
    try {
        const newListing = new Listing(listing);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        console.error(err.message);
    }
});



app.get("/listings/new", async (req, res) => {
    console.log("new form working");
    res.render("listings/new.ejs");
});


app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let individualListing = await Listing.findById(id);
    console.log("working the individual post read req");
    res.render("listings/show.ejs", { individualListing });
});