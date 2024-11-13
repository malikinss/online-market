const { Op } = require("sequelize");
const ApiError = require("../../../middleware/errorHandling/ApiError/ApiError");
const { messages } = require("../messagesHandler/messagesHandler");

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
    try {
        if (!field) {
            throw ApiError.badRequest(messages.errors.nullData("Field", ""));
        }

        if (!value) {
            throw ApiError.badRequest(messages.errors.nullData("Value", ""));
        }

        if (!Model) {
            throw ApiError.badRequest(messages.errors.nullData("Model", ""));
        }

        // Create a condition to exclude the user with the passed userId
        const excludeCondition = currentId
            ? { id: { [Op.ne]: currentId } }
            : {};

        // Search for a user by the specified field, excluding the specified userId
        return await Model.findOne({
            where: {
                [field]: value, // Condition for searching by field
                ...excludeCondition, // Condition for excluding a user
            },
        });
    } catch (e) {
        throw ApiError.internal(
            messages.errors.general("fetching", "record", e.message)
        );
    }
};

/**
 * Fetches all records from the specified model.
 * @param {Object} model - The model from which to fetch records.
 * @throws {ApiError} Throws an error if the model is not provided or if an error occurs during fetching.
 * @returns {Promise<Array>} Returns a promise that resolves to an array of records.
 */
const findAllRecords = async (Model) => {
    try {
        if (!Model) {
            throw ApiError.badRequest(messages.errors.nullData("Model", ""));
        }

        const records = await Model.findAll();

        // If the records are not found, throw a not found error
        if (!records) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "records")
            );
        }

        return records;
    } catch (e) {
        throw ApiError.internal(
            messages.errors.general("fetching", "records", e.message)
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
    try {
        if (!field) {
            throw ApiError.badRequest(messages.errors.nullData("Field", ""));
        }

        if (!value) {
            throw ApiError.badRequest(messages.errors.nullData("Value", ""));
        }

        if (!Model) {
            throw ApiError.badRequest(messages.errors.nullData("Model", ""));
        }

        const record = await Model.findOne({ where: { [field]: value } });

        // If the record is not found, throw a not found error
        if (!record) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "record")
            );
        }

        return record;
    } catch (e) {
        throw ApiError.internal(
            messages.errors.general("fetching", "record", e.message)
        );
    }
};

/**
 * Fetches records from the specified model that match the provided filter.
 * @param {string} field - The field to filter by.
 * @param {any} value - The value to match in the filter.
 * @param {Object} model - The model from which to fetch records.
 * @throws {ApiError} Throws an error if the model is not provided or if an error occurs during fetching.
 * @returns {Promise<Array>} Returns a promise that resolves to an array of records.
 */
const findRecordsByField = async (field, value, Model) => {
    try {
        if (!field) {
            throw ApiError.badRequest(messages.errors.nullData("Field", ""));
        }

        if (!value) {
            throw ApiError.badRequest(messages.errors.nullData("Value", ""));
        }

        if (!Model) {
            throw ApiError.badRequest(messages.errors.nullData("Model", ""));
        }

        const records = await Model.findAll({ where: { [field]: value } });

        // If the records are not found, throw a not found error
        if (!records) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "records")
            );
        }

        return records;
    } catch (e) {
        throw ApiError.internal(
            messages.errors.general("fetching", "records", e.message)
        );
    }
};

/**
 * Finds records in the database using specified filters, fields, and includes.
 * @param {Object} Model - The Sequelize model to query.
 * @param {Object} wheres - The filter conditions to apply in the query (e.g., where conditions).
 * @param {string[]} [fields=[]] - The array of attributes to select in the query result (optional).
 * @param {Object[]} [includes=[]] - The array of associated models to include in the query (optional).
 * @param {boolean} [many=false] - Whether to fetch multiple records (default is false).
 * @throws {ApiError} - Throws an error if any required parameters are missing or invalid.
 * @returns {Promise<Object|Object[]|null>} - Returns a single record, an array of records, or null if not found.
 */
const findRecordsByFieldInclude = async (
    Model,
    wheres,
    fields = [],
    includes = [],
    many = false
) => {
    try {
        if (!Model) {
            throw ApiError.badRequest(messages.errors.nullData("Model", ""));
        }

        if (!wheres) {
            throw ApiError.badRequest(
                messages.errors.nullData("Filter", "Value")
            );
        }

        if (!fields) {
            throw ApiError.badRequest(
                messages.errors.nullData("Fields", "Value")
            );
        }

        if (!includes) {
            throw ApiError.badRequest(
                messages.errors.nullData("Includes", "Value")
            );
        }

        const queryOptions = {
            where: wheres,
            attributes: fields,
            include: includes,
        };

        // If 'many' is true, find all records, otherwise find one
        const record = many
            ? await Model.findAll(queryOptions)
            : await Model.findOne(queryOptions);

        return record;
    } catch (e) {
        throw ApiError.internal(
            messages.errors.general("fetching", "records", e.message)
        );
    }
};

module.exports = {
    findModelExcludingId,
    findRecordByField,
    findAllRecords,
    findRecordsByField,
    findRecordsByFieldInclude,
};
