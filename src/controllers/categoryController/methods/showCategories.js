const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findAllRecords } = require("../../controllerUtils/findHandlers");
const messages = require("./messages");

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
        console.log(messages.success("Category", "fetched"));

        return res.json(categories);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.general("fetching", "category", e.message)
            )
        );
    }
};

module.exports = getCategories;
