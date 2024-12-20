const sequelize = require("../../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
    validationRules,
    createValidation,
    createValidationIsIn,
} = require("../modelsUtils/validations/validations");

const Order = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            validate: {
                isInt: true,
            },
        },

        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "payments",
                key: "id",
            },
            validate: {
                isInt: true,
            },
        },

        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: "Unpaid",
            validate: createValidation(
                validationRules.order.price,
                "total price"
            ),
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Unpaid",
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
