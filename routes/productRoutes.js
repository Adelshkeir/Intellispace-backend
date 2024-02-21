import express from "express";
import ProductsController from "../controllers/productControllers.js";
import upload from "../middlewares/multer.js";
const productRouter = express.Router();

productRouter.post(
  "/",
  upload.single("image"),
  ProductsController.createProduct
);

productRouter.get("/", ProductsController.getAllProducts);

productRouter.get(
  "/category/:categoryName",
  ProductsController.getProductsByCategory
);
productRouter.get("/curators_pick", ProductsController.getCuratorsPickProducts);
productRouter.get("/:id", ProductsController.getOneProduct);
productRouter.delete("/:id", ProductsController.deleteProduct);

productRouter.put("/:id", ProductsController.updateProduct);

export default productRouter;
