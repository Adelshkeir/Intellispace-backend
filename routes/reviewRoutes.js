import express from "express";
import ReviewsController from "../controllers/reviewController.js";
const reviewRouter = express.Router();

reviewRouter.post("/", ReviewsController.createReview);

reviewRouter.get("/", ReviewsController.getAllReviews);

reviewRouter.put("/:id", ReviewsController.updateReview);

reviewRouter.delete("/:id", ReviewsController.deleteReview);

export default reviewRouter;
