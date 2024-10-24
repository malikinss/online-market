const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");
const {
    validationRules,
    createValidation,
    createValidationIsIn,
} = require("../utils/validationHandling");
const { messages } = require("../views/messageHandling");

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: createValidation(
                validationRules.user.firstName,
                "first name"
            ),
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: createValidation(
                validationRules.user.lastName,
                "last name"
            ),
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: messages.error.requirements("email"),
                },
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: createValidation(
                validationRules.user.password,
                "password"
            ),
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: createValidation(validationRules.user.phone, "phone"),
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",
            validate: createValidationIsIn(validationRules.user.roles, "role"),
        },

        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "addresses",
                key: "id",
            },
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

module.exports = User;
