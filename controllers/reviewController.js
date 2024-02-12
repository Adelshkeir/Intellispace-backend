import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

class ReviewsController {
  static async createReview(req, res) {
    try {
      const { message, userId, productId } = req.body;
      const errors = [];
      
      if (!message || !userId || !productId) {
        errors.push("Message, user ID, and product ID are required");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      try {
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const newReview = await Review.create({
          message,
          userId,
          productId,
        });

        if (!newReview) {
          errors.push("Error creating review");
          return res.status(500).json({ errors });
        }

        return res.status(201).json({ newReview });
      } catch (sequelizeError) {
        return res.status(500).json({ message: sequelizeError.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllReviews(req, res) {
    try {
      const reviews = await Review.findAll({ include: User }); // Include associated user
      if (reviews.length === 0) {
        return res.status(404).json("There are no available reviews");
      }
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const errors = [];

      if (!message) {
        errors.push("Message is required");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const review = await Review.findByPk(id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      review.message = message;
      await review.save();

      return res.status(200).json({ review });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      await review.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ReviewsController;
