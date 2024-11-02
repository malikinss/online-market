const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const messages = require("./messages");

/**
 * Deletes a category by ID from the database.
 * @param {Object} req - Express request object containing category ID in req.params.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object with a success message.
 */
const deleteCategory = async (req, res, next) => {
    try {
        const categoryID = req.params.id;

        // Validate input to ensure no falsy values
        containsFalsyValues([categoryID]);

        const categoryToDelete = await findRecordByField(
            "id",
            categoryID,
            Category
        );
        if (!categoryToDelete) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Category")
            );
        }

        await categoryToDelete.destroy();

        // Log success message
        console.log(messages.success("Category", "deleted"));

        return res.json({ message: messages.success("Category", "deleted") });
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("deleting", "category", e.message)
            )
        );
    }
};

module.exports = deleteCategory;
