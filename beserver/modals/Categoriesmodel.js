import { DataTypes } from "sequelize";

import sequelize from "../config/sequelizequery.js";

export const Category = sequelize.define("Categories", {
    categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},{
    timestamps: false,
  },
);
await Category.sync();


