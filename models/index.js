import Order from "./orderModel.js";
import OrderItem from "./orderitemModel.js";
import User from "./userModel.js";
// import Admin from "./adminModel.js";
// import Category from "./categoryModel.js";
import Product from "./productModel.js";
// import Review from "./reviewModel.js";

Order.belongsTo(User, { foreignKey: "userId" });
// Order.hasMany(OrderItem); // No need to specify foreign key here

OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

Order.sync();
OrderItem.sync();

// export { Order, OrderItem };
export { Order, OrderItem };
