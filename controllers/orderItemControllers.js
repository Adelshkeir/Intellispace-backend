// orderItemController.js

import { OrderItem } from "../models/index.js";

const orderItemController = {
  async getOrderItemsByOrderId(req, res) {
    try {
      const { orderId } = req.params;

      const orderItems = await OrderItem.findAll({
        where: {
          orderId: orderId,
        },
      });

      if (orderItems.length === 0) {
        return res
          .status(404)
          .json({ message: "No order items found for the given orderId" });
      }

      return res.status(200).json(orderItems);
    } catch (error) {
      console.error("Error in getOrderItemsByOrderId:", error);
      return res.status(500).json({ message: error.message });
    }
  },
};

export default orderItemController;
