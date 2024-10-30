const { findUserExcludingId } = require("./findHandlers");
const ApiError = require("../../error/ApiError");

/**
 * Checks if the specified field is unique.
 * @param {string} fieldValue - The field value to check.
 * @param {string} fieldName - The name of the field to check (e.g. 'email' or 'phone').
 * @param {Object} Model - The model to check for.
 * @param {string|null} [userId=null] - The user ID to exclude from checking.
 * @returns {Promise<void>} - Returns an error if the field already exists.
 */
const checkFieldUniqueness = async (
    fieldValue,
    fieldName,
    Model,
    userId = null
) => {
    const existingField = await findUserExcludingId(
        fieldValue,
        fieldName,
        Model,
        userId
    );
    if (existingField) {
        throw ApiError.badRequest(
            `A user with this ${fieldName} already exists`
        );
    }
};

/**
 * Checks the uniqueness of email and phone.
 * @param {string} email - User email to check.
 * @param {string} phone - User phone number to check.
 * @param {Object} Model - Model to check.
 * @param {string|null} [userId=null] - User ID to exclude from checking.
 * @returns {Promise<void>} - Returns an error if email or phone already exist.
 */
const checkEmailAndPhoneUniqueness = async (
    email,
    phone,
    Model,
    userId = null
) => {
    await Promise.all([
        checkFieldUniqueness(email, "email", Model, userId),
        checkFieldUniqueness(phone, "phone", Model, userId),
    ]);
};

module.exports = { checkFieldUniqueness, checkEmailAndPhoneUniqueness };
