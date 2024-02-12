import sequelize from "../databaseConfiguration/database.js";
import { DataTypes } from "sequelize";


const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
Category.sync();
export default Category;