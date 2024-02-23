// orderController.js
import Order from "../models/orderModel.js";
import OrderItem from "../models/orderitemModel.js";
import User from "../models/userModel.js";

class OrderController {
  static async createOrder(req, res) {
    try {
      const { userId, totalAmount, products } = req.body;
  
      if (!userId || !totalAmount || !products || !products.length) {
        return res.status(400).json({ message: "Invalid request data" });
      }
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const newOrder = await Order.create({
        userId,
        totalAmount,
      });
  
  
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
  
      newOrder.dataValues.OrderItems = orderItems;
  
      return res.status(201).json({ newOrder });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({ include: OrderItem });
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
