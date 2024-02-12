// orderItemModel.js
import sequelize from "../databaseConfiguration/database.js";
import { DataTypes } from "sequelize";
import Product from "./productModel.js";
import Order from "./orderModel.js";

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});



OrderItem.belongsTo(Product, { foreignKey: 'productId' });
OrderItem.sync();
export default OrderItem;
