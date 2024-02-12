import sequelize from "../databaseConfiguration/database.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";
import Product from "./productModel.js";

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


Review.belongsTo(User, { foreignKey: 'userId' }); 
Review.belongsTo(Product, { foreignKey: 'productId' }); 

User.hasMany(Review, { foreignKey: 'userId' }); 
Product.hasMany(Review, { foreignKey: 'productId' }); 

Review.sync();
export default Review;
