import Category from "../models/categoryModel.js";
import { Op } from "sequelize";
import Product from "../models/productModel.js";
class CategoriesController {
  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const errors = [];
      
      if (!name) {
        errors.push("Category name is required");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      try {
        const existingCategory = await Category.findOne({
          where: {
            [Op.or]: [{ name: name }],
          },
        });

        if (existingCategory) {
          errors.push("Category already exists");
          return res.status(400).json({ errors });
        }

        const newCategory = await Category.create({
          name,
        });

        if (!newCategory) {
          errors.push("Error creating category");
          return res.status(500).json({ errors });
        }

        return res.status(201).json({ newCategory });
      } catch (sequelizeError) {
        return res.status(500).json({ message: sequelizeError.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({
        include: Product,
      });

      if (categories.length === 0) {
        return res.status(404).json("There are no available categories");
      }

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const errors = [];

      if (!name) {
        errors.push("Category name is required");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      category.name = name;
      await category.save();

      return res.status(200).json({ category });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await category.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default CategoriesController;
