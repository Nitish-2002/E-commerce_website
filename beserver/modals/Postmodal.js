import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizequery.js";
export const Post = sequelize.define('posts', {
    PostId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true, 
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: DataTypes.NOW,
    },
    Price: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    Category: {
        type: DataTypes.STRING,
    },
    FileName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // path: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
}, {
    timestamps: false,
});
await Post.sync();

