const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

const { messages } = require("../views/messageHandling");

popularRegExps = {
    geographicName: /^[A-Za-z\s\-’'é]{2,100}$/, // Geographic names (countries and cities)
    personalName: /^[a-zA-Z]{2,20}$/, // User names
    positiveNumber: /^\d+$/, // Positive integer
    moneyValue: /^\d{1,8}(\.\d{1,2})?$/, // Money value with two decimal places
    itemName: /^[A-Za-z0-9\s\-]{2,100}$/, // Item name: alphanumeric, spaces, and hyphens
};

const validationRules = {
    user: {
        firstName: popularRegExps.personalName,
        lastName: popularRegExps.personalName,
        phone: /^0\d{9}$/, // Phone number format: 0XXXXXXXXX
        password: /^[a-zA-Z0-9!@#$%^&*]{8,20}$/, // Password with allowed characters
        roles: ["user", "admin"], // User roles
    },

    address: {
        country: popularRegExps.geographicName,
        city: popularRegExps.geographicName,
        street: popularRegExps.geographicName,
        building: popularRegExps.positiveNumber,
        appartment: popularRegExps.positiveNumber,
        postal: /^\d{7}$/, // Postal code format: 7 digits long
    },

    order: {
        price: popularRegExps.moneyValue,
        status: [
            "Created",
            "Unpaid",
            "Paid",
            "Processing",
            "Shipped",
            "Delivered",
            "Canceled",
            "Returned",
        ],
    },

    orderItem: {
        quantity: popularRegExps.positiveNumber,
        price: popularRegExps.moneyValue,
    },

    item: {
        name: popularRegExps.itemName,
        price: popularRegExps.positiveNumber,
        stock: popularRegExps.positiveNumber,
        img: /\.(jpg|jpeg|png|gif)$/i, // The image URL must end with .jpg, .jpeg, .png, or .gif
    },

    category: {
        name: popularRegExps.itemName,
    },
};

/**
 * Creates a validation object for the specified rule and field name.
 *
 * @param {RegExp} rule - The regular expression for validating the field.
 * @param {string} fieldName - The name of the field for which validation is created.
 * @returns {Object} The validation object with the is rule.
 */
const createValidation = (rule, fieldName) => ({
    is: {
        args: rule,
        msg: messages.error.requirements(fieldName),
    },
});

/**
 * Creates a validation object for checking if the value is in the specified list.
 *
 * @param {Array} rule - The array of allowed values for validating the field.
 * @param {string} fieldName - The name of the field for which validation is created.
 * @returns {Object} The validation object with the isIn rule.
 */
const createValidationIsIn = (rule, fieldName) => ({
    isIn: {
        args: [rule], // Adding statuses for validation
        msg: messages.error.requirements(fieldName),
    },
});

const checkUserUniqueness = async (email, phone, userId = null, next) => {
    // Execute requests simultaneously to check email and phone
    const [candidateEmail, candidatePhone] = await Promise.all([
        User.findOne({
            where: {
                email,
                ...(userId ? { id: { [Op.ne]: userId } } : {}),
            },
        }),
        User.findOne({
            where: {
                phone,
                ...(userId ? { id: { [Op.ne]: userId } } : {}),
            },
        }),
    ]);

    if (candidateEmail || candidatePhone) {
        return next(
            ApiError.badRequest(
                "A user with such email or phone number already exists"
            )
        );
    }
};

const checkForFalsyValues = (values, next) => {
    if (values.some((field) => !field)) {
        return next(
            ApiError.badRequest(
                "Incorrect data for saving: One of the values is missing"
            )
        );
    }
};

const validatePassword = async (password, curUserPassword) => {
    // Сравниваем пароли
    const isPasswordValid = await bcrypt.compare(password, curUserPassword);

    if (!isPasswordValid) {
        return next(ApiError.internal("Wrong Password"));
    }
};

module.exports = {
    validationRules,
    createValidation,
    createValidationIsIn,
    checkUserUniqueness,
    checkForFalsyValues,
    validatePassword,
};
