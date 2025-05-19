const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listingschema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6821b99ad31672cc6b7966a4",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();
