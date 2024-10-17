const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
  validationRules,
  createValidation,
} = require("../utils/validationHandling");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: createValidation(validationRules.category.name, "category"),
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

module.exports = Category;
