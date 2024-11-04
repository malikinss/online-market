const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findAllRecords } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves all categories from the database and returns them as a JSON array.
 * This function serves as middleware in an Express.js application, handling incoming requests to fetch all category records.
 * It performs validation checks and returns appropriate error messages if the categories are not found or if an internal error occurs during fetching.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the Express middleware chain.
 * @throws {ApiError} If no categories are found in the database, a not found error is thrown.
 * @throws {ApiError} If an error occurs while fetching categories, an internal error is thrown.
 */
const getCategories = async (req, res, next) => {
    try {
        // Find all categories from the database
        const categories = await findAllRecords(Category);
        if (!categories) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Categories")
            );
        }

        // Log success message
        console.log(messages.success("Categories", "found"));

        // Return the categories as a JSON response
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
