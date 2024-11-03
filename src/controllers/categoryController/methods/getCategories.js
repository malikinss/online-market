const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findAllRecords } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves all categories from the database and returns them as JSON.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON array of categories.
 */
const getCategories = async (req, res, next) => {
    try {
        const categories = await findAllRecords(Category);
        if (!categories) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Categories")
            );
        }

        // Log success message
        console.log(messages.success("Categories", "found"));

        return res.json(categories);
    } catch (e) {
        return next(
            ApiError.internal(
                messages.general("fetching", "Categories", e.message)
            )
        );
    }
};

module.exports = getCategories;
