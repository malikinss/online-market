const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
    validationRules,
    createValidation,
} = require("../utils/validationHandling");

const UserAddress = sequelize.define(
    "address",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: createValidation(
                validationRules.address.country,
                "country"
            ),
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: createValidation(validationRules.address.city, "city"),
        },

        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: createValidation(
                validationRules.address.street,
                "street"
            ),
        },

        building: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: createValidation(
                validationRules.address.building,
                "building number"
            ),
        },

        apartment: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: createValidation(
                validationRules.address.apartment,
                "apartment number"
            ),
        },

        postal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: createValidation(
                validationRules.address.postal,
                "postal code"
            ),
        },
    },
    {
        tableName: "addresses",
        timestamps: true,
    }
);

module.exports = UserAddress;
