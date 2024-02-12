import express from "express";
import OrderController from "../controllers/orderControllers.js";

const orderRouter = express.Router();


orderRouter.post("/", OrderController.createOrder);


orderRouter.get("/", OrderController.getAllOrders);


orderRouter.put("/:id/status", OrderController.updateOrderStatus);

export default orderRouter;
