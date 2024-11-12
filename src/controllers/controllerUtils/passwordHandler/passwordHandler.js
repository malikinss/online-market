const bcrypt = require("bcrypt");
const ApiError = require("../../../error/ApiError");
const { messages } = require("../messagesHandler/messagesHandler");

/**
 * Function to validate the password by comparing it with the current hashed password.
 *
 * @async
 * @param {string} password - The entered password by the user.
 * @param {string} curUserPassword - The currently stored hashed password of the user.
 * @param {Function} next - The error-handling function.
 * @returns {Promise<void>} - Returns a promise.
 */
const validatePassword = async (password, curUserPassword, next) => {
    // Compare the entered password with the hashed password stored for the user.
    const isPasswordValid = await bcrypt.compare(password, curUserPassword);

    // If the password is not valid, return an error.
    if (!isPasswordValid) {
        return next(ApiError.internal("Wrong Password"));
    }
};

/**
 * Function to validate if the password meets the security requirements.
 * The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
 *
 * @param {string} password - The password to be validated.
 * @param {Function} next - The error-handling function.
 * @returns {boolean} - Returns true if the password meets the requirements, otherwise triggers an error.
 */
const validatePasswordCreation = (password, next) => {
    try {
        // Regex for password validation: at least one lowercase, one uppercase, one digit, and one special character.
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        return regex.test(password);
    } catch (e) {
        return next(
            ApiError.badRequest(messages.errors.requirements("Password"))
        );
    }
};

/**
 * Function to hash the password after validating it.
 *
 * @async
 * @param {string} password - The password to be hashed.
 * @param {Function} next - The error-handling function.
 * @returns {Promise<string>} - Returns the hashed password.
 */
const getValidHashedPassword = (password, next) => {
    try {
        // Validate the password before proceeding to hashing.
        const isValidPswd = validatePasswordCreation(password, next);
        if (!isValidPswd) {
            throw ApiError.badRequest("Password is not valid");
        }

        // Hash the password asynchronously with a salt rounds value of 5.
        const hashedPassword = bcrypt.hash(password, 5);
        return hashedPassword;
    } catch (e) {
        return next(
            ApiError.badRequest(messages.errors.requirements("Password"))
        );
    }
};

module.exports = { getValidHashedPassword };
