const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const categoryMessages = require("./messages");

/**
 * Deletes a category by ID from the database.
 * @param {Object} req - Express request object containing category ID in req.params.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object with a success message.
 */
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        containsFalsyValues([id]);

        const category = await findRecordByField("id", id, Category);

        await category.destroy();

        return res.json({ message: categoryMessages.delete.success });
    } catch (e) {
        next(
            ApiError.badRequest(categoryMessages.delete.generalError(e.message))
        );
    }
};

module.exports = deleteCategory;
