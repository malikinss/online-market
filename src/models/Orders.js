const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
  validationRules,
  createValidation,
  createValidationIsIn,
} = require("../utils/validationHandling");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: createValidation(validationRules.order.price, "total price"),
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Created",
      validate: createValidationIsIn(
        validationRules.order.status,
        "order status"
      ),
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;
