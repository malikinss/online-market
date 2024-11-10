const Category = require("../../../models/Categories/Categories");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Updates the name of a category by ID in the database.
 * @param {Object} req - Express request object containing category ID in req.params and new name in req.body.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object of the updated category.
 */
const updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        // Validate if the Category records are found
        if (!categoryId) {
            throw ApiError.notFound(messages.errors.nullData("Category", "id"));
        }

        const newName = req.body.name;
        // Validate if the Category records are found
        if (!newName) {
            throw ApiError.notFound(
                messages.errors.nullData("Category", "new name")
            );
        }

        const categoryToUpdate = await findRecordByField(
            "id",
            categoryId,
            Category
        );
        if (!categoryToUpdate) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Category")
            );
        }

        // Save the updated caetgory to the database
        await categoryToUpdate.update({ name: newName });

        // Log success message
        console.log(messages.success("Category", "updated"));

        return res.json(categoryToUpdate);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("updating", "category", e.message)
            )
        );
    }
};

module.exports = updateCategory;
