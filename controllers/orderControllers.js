// orderController.js

import { Order, OrderItem } from "../models/index.js";
import User from "../models/userModel.js";

class OrderController {
  static async createOrder(req, res) {
    try {
      console.log("Request body:", req.body);
  
      const { userId, totalAmount, products } = req.body;
  
      console.log("userId:", userId);
      console.log("totalAmount:", totalAmount);
      console.log("products:", products);
  
      if (!userId || !totalAmount || !products || !products.length) {
        return res.status(400).json({ message: "Invalid request data" });
      }
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User:", user);
  
      const newOrder = await Order.create({
        userId,
        totalAmount,
      });
  
      console.log("New Order:", newOrder);
  
      const orderItems = [];
      for (const product of products) {
        const orderItem = await OrderItem.create({
          orderId: newOrder.id,
          productId: product.productId,
          price: product.price,
          quantity: product.quantity,
        });
        orderItems.push(orderItem);
      }
  
      console.log("Order Items:", orderItems);
  
      // Manually set association between Order and OrderItem
      newOrder.orderItems = orderItems;
  
      return res.status(201).json({ newOrder });
    } catch (error) {
      console.error("Error in createOrder:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({ include: { model: OrderItem } });
  
      if (orders.length === 0) {
        return res.status(404).json("There are no available orders");
      }
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  

  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate required fields
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.status = status;
      await order.save();

      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default OrderController;
