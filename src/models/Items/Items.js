const sequelize = require("../../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
    validationRules,
    createValidation,
} = require("../modelsUtils/validations/validations");

const Item = sequelize.define(
    "item",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categories",
                key: "id",
            },
        },

        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: createValidation(validationRules.item.name, "item name"),
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: createValidation(
                validationRules.item.price,
                "item price"
            ),
        },

        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: createValidation(
                validationRules.item.stock,
                "item stock"
            ),
        },

        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: createValidation(validationRules.item.img, "item image"),
        },
    },
    {
        tableName: "items",
        timestamps: true,
    }
);

module.exports = Item;
