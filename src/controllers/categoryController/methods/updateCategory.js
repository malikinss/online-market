const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const messages = require("./messages");

/**
 * Updates the name of a category by ID in the database.
 * @param {Object} req - Express request object containing category ID in req.params and new name in req.body.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object of the updated category.
 */
const updateCategory = async (req, res, next) => {
    try {
        const categoryID = req.params.id;
        const { newName } = req.body;

        // Validate input to ensure no falsy values
        containsFalsyValues([categoryID, newName]);

        const categoryToUpdate = await findRecordByField(
            "id",
            categoryID,
            Category
        );
        if (!categoryToUpdate) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Category")
            );
        }

        // Update the category name
        categoryToUpdate.name = newName;

        await categoryToUpdate.save();

        // Log success message
        console.log(messages.success("Category", "updated"));

        return res.json(category);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("updating", "category", e.message)
            )
        );
    }
};

module.exports = updateCategory;
