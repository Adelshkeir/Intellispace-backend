import sequelize from "../databaseConfiguration/database.js";
import { DataTypes } from "sequelize";
import Category from "./categoryModel.js";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    curators_pick: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
});


Category.hasMany(Product, {
    foreignKey: "categoryId",
    onDelete: "CASCADE",
  });
  Product.belongsTo(Category, { foreignKey: "categoryId"});


Product.sync();
export default Product;