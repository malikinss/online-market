const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
    "payment",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "Payment status: true for completed, false for pending",
        },
    },
    {
        tableName: "payments",
        timestamps: true,
    }
);

module.exports = Payment;
