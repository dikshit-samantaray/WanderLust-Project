const express = require("express");
const router = express.Router();
const asyncwrap = require("../utils/wrapAsync.js");
const Listing = require("../models/listingschema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(asyncwrap(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    asyncwrap(listingController.createListing)
  );
//Render category
router.get("/cat/:category", listingController.renderCategory);

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    asyncwrap(listingController.updateListing)
  )
  .get(asyncwrap(listingController.showListing))

  .delete(isLoggedIn, isOwner, asyncwrap(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncwrap(listingController.renderEditForm)
);

module.exports = router;
