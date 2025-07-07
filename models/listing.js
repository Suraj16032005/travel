const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {

    filename: {
      type: String,
      default: "default-image",
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1545972152-705b6e6f56f1?auto=format&fit=crop&w=900&q=60",
      set: (v) =>
        !v || v.trim() === ""
          ? "https://images.unsplash.com/photo-1545972152-705b6e6f56f1?auto=format&fit=crop&w=900&q=60"
          : v,
    },


  },
  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;