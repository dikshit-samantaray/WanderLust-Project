const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncwrap = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../validationjoi.js");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//Reviews(Post Route)
router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncwrap(reviewController.createReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  asyncwrap(reviewController.destroyReview)
);

module.exports = router;
