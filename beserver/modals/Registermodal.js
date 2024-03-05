import { DataTypes } from "sequelize";

import sequelize from "../config/sequelizequery.js";
export const User = sequelize.define('Users',{
    id: {
        // type: DataTypes.INTEGER,
        // allowNull: false,
        // unique: true,
        // primaryKey:true
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true, 
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}
,{
    timestamps: false,
  },
);
await User.sync();