const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findAllRecords } = require("../../controllerUtils/findHandlers");
const categoryMessages = require("./messages");

/**
 * Retrieves all categories from the database and returns them as JSON.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON array of categories.
 */
const showCategories = async (req, res, next) => {
    try {
        const categories = await findAllRecords(Category);
        console.log(categoryMessages.show.success);

        return res.json(categories);
    } catch (e) {
        next(
            ApiError.badRequest(categoryMessages.show.generalError(e.message))
        );
    }
};

module.exports = showCategories;
