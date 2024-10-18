const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");
const { validationRules, createValidation } = require("../utils/validationHandling");

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: createValidation(validationRules.item.name, "item name"),
    },
    description: {type: DataTypes.TEXT, allowNull: true},
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: createValidation(validationRules.item.price, "item price"),
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: createValidation(validationRules.item.stock, "item stock"),
    },
    img: {type: DataTypes.STRING, allowNull: false},
});

module.exports = Item;
