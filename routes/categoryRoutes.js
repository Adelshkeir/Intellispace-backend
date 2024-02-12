import express from "express";
import CategoriesController from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", CategoriesController.createCategory);

categoryRouter.get("/", CategoriesController.getAllCategories);

categoryRouter.delete("/:id", CategoriesController.deleteCategory);

categoryRouter.put("/:id", CategoriesController.updateCategory);

export default categoryRouter;
