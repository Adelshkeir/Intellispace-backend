// orderItemRoute.js

import express from 'express';
import orderItemController from '../controllers/orderItemControllers.js';

const router = express.Router();

router.get('/:orderId/', orderItemController.getOrderItemsByOrderId);

export default router;
