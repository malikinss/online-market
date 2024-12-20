const Category = require("../../../../models/Categories/Categories");
const ApiError = require("../../../../middleware/errorHandling/ApiError/ApiError");

const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Creates a new item category in the database.
 * @param {Object} req - Express request object containing the category name in req.body.
 * @param {Object} res - Express response object for sending the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object of the created category.
 * @throws {ApiError} Throws an ApiError if category creation fails or input validation fails.
 */
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Validate input to ensure no falsy values
        if (!name) {
            throw ApiError.internal(
                messages.errors.nullData("Category", "Name")
            );
        }

        const newCategory = await Category.create({ name });
        if (!newCategory) {
            throw ApiError.internal(
                messages.errors.actionFailed("create", "Category")
            );
        }

        // Log success message
        console.log(messages.success("Category", "created"));

        return res.json(newCategory);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("creating", "Category", e.message)
            )
        );
    }
};

module.exports = createCategory;
