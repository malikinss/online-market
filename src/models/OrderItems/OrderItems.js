const sequelize = require("../../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
    validationRules,
    createValidation,
} = require("../validations/validationHandling");

const OrderItem = sequelize.define(
    "orderItem",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "orders",
                key: "id",
            },
            validate: {
                isInt: true,
            },
        },

        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "items",
                key: "id",
            },
            validate: {
                isInt: true,
            },
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: createValidation(
                validationRules.orderItem.quantity,
                "quantity"
            ),
        },

        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: createValidation(
                validationRules.orderItem.price,
                "unit price"
            ),
        },

        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: createValidation(
                validationRules.orderItem.price,
                "total price"
            ),
        },
    },
    {
        tableName: "orderitems",
        timestamps: true,
        hooks: {
            beforeSave: (orderItem) => {
                // Automatically calculate `totalPrice` before saving
                orderItem.totalPrice = orderItem.unitPrice * orderItem.quantity;
            },
        },
    }
);

module.exports = OrderItem;
