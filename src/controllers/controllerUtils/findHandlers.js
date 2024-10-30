const { Op } = require("sequelize");
const ApiError = require("../../error/ApiError");

/**
 * Finds a user by the given field, excluding the user with the given ID.
 * @param {string} value - The value of the field to search for.
 * @param {string} field - The name of the field to search for.
 * @param {Object} UserModel - The model to search for the user.
 * @param {string|null} [userId=null] - The ID of the user to exclude from the search if not passed searching goes through all users
 * @returns {Promise<Object|null>} - The found user, or null if the user was not found.
 * @throws {Error} - If an error occurred while executing the request.
 */
const findUserExcludingId = async (value, field, UserModel, userId = null) => {
    // Create a condition to exclude the user with the passed userId
    const excludeCondition = userId ? { id: { [Op.ne]: userId } } : {};

    try {
        // Search for a user by the specified field, excluding the specified userId
        return await UserModel.findOne({
            where: {
                [field]: value, // Condition for searching by field
                ...excludeCondition, // Condition for excluding a user
            },
        });
    } catch (error) {
        throw ApiError.badRequest(
            `Error searching user by field "${field}": ${error.message}`
        );
    }
};

module.exports = { findUserExcludingId };
