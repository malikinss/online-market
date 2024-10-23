const ApiError = require("../error/ApiError");

/**
 * Finds an element by its ID from the given model.
 * @param {number|string} id - The ID of the element to find.
 * @param {Object} Model - The database model to search in.
 * @param {function} next - Express middleware function for handling errors.
 * @returns {Object} The found element or an error if not found.
 */
async function findByField(field, Model, next) {
    try {
        const element = await Model.findOne({ where: { field } });

        if (!element) {
            return next(ApiError.notFound("Element not found"));
        }

        return element;
    } catch (error) {
        return next(
            ApiError.internal("An error occurred while fetching the element")
        );
    }
}

module.exports = findByField;
