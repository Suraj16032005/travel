const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
main().then(()=>{
    console.log("connected successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/travel');
}

const initdb=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({
      ...obj, 
      owner: "689585dea39ca9f4c1d632e2"
    }));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initdb();