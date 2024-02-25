// orderModel.js
import sequelize from "../databaseConfiguration/database.js";
import { DataTypes } from "sequelize";
import OrderItem from "./orderitemModel.js";
import User from "./userModel.js";

export default  sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending', 
    },
});


