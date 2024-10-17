const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
  validationRules,
  createValidation,
} = require("../utils/validationHandling");

const OrderItem = sequelize.define(
  "orderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: createValidation(validationRules.orderItem.quantity, "quantity"),
    },

    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: createValidation(validationRules.orderItem.price, "unit price"),
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: createValidation(validationRules.orderItem.price, "total price"),
    },
  },
  {
    tableName: "orderitems",
    timestamps: true,
  }
);

module.exports = OrderItem;
