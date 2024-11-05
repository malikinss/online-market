const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Deletes a category by ID from the database.
 * @param {Object} req - Express request object containing category ID in req.params.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object with a success message.
 */
const deleteCategory = async (req, res, next) => {
    try {
        // Extract category ID from request parameters
        const categoryId = req.params.id;

        // Validate if the category ID is provided
        if (!categoryId) {
            throw ApiError.badRequest(
                messages.errors.nullData("Category", "Id")
            );
        }

        // Find the category record by ID
        const categoryToDelete = await findRecordByField(
            "id",
            categoryId,
            Category
        );

        // Validate if the Category record is found
        if (!categoryToDelete) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Category")
            );
        }

        // Destroy the category record from the database
        await categoryToDelete.destroy();

        // Log success message to console
        console.log(messages.success("Category", "deleted"));

        // Return success response
        return res.json({ message: messages.success("Category", "deleted") });
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("deleting", "category", e.message)
            )
        );
    }
};

module.exports = deleteCategory;
