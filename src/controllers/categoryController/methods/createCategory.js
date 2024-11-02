const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const messages = require("./messages");

/**
 * Creates a new item category in the database.
 * @param {Object} req - Express request object containing the category name in req.body.
 * @param {Object} res - Express response object for sending the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object of the created category.
 */
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Validate input to ensure no falsy values
        containsFalsyValues([name]);

        const newCategory = await Category.create({ name });
        if (!newCategory) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("create", "Category")
            );
        }

        // Log success message
        console.log(messages.success("Category", "created"));

        return res.json(newCategory);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("creating", "category", e.message)
            )
        );
    }
};

module.exports = createCategory;
