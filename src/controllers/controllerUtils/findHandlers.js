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
const findModelExcludingId = async (value, field, Model, currentId = null) => {
    if (!value || !field) {
        throw ApiError.badRequest("Both 'value' and 'field' must be provided");
    }

    // Create a condition to exclude the user with the passed userId
    const excludeCondition = currentId ? { id: { [Op.ne]: currentId } } : {};

    try {
        // Search for a user by the specified field, excluding the specified userId
        return await Model.findOne({
            where: {
                [field]: value, // Condition for searching by field
                ...excludeCondition, // Condition for excluding a user
            },
        });
    } catch (e) {
        throw ApiError.badRequest(
            `Error searching user by field "${field}": ${e.message}`
        );
    }
};

/**
 * Finds a record in the specified model by a given field and value.
 * @param {string} field - The field name to search by.
 * @param {any} value - The value to search for in the specified field.
 * @param {Object} Model - The model in which to perform the search.
 * @returns {Promise<Object|null>} - The found record or null if not found.
 * @throws {Error} - If an error occurred during the search.
 */
const findRecordByField = async (field, value, Model) => {
    if (!field || value === undefined) {
        throw ApiError.badRequest("Both 'field' and 'value' must be provided");
    }

    try {
        const result = await Model.findOne({ where: { [field]: value } });
        if (!result) {
            next(ApiError.notFound(`Record not found`));
        }

        return result;
    } catch (e) {
        throw ApiError.internal(
            `An error occurred while fetching the record: ${e.message}`
        );
    }
};

const findAllRecords = async (Model) => {
    if (!Model) {
        throw ApiError.badRequest("Model must be provided");
    }

    try {
        const records = await Model.findAll();
        return records;
    } catch (e) {
        throw ApiError.internal(
            `An error occurred while fetching the records: ${e.message}`
        );
    }
};

module.exports = { findModelExcludingId, findRecordByField, findAllRecords };
