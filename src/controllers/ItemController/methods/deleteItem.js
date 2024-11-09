const Item = require("../../../models/Items/Items");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Deletes an item by its ID.
 * @param {Object} req - The request object containing the item ID in `req.params.id`.
 * @param {Object} res - The response object, used to send the deletion success message.
 * @param {Function} next - The next middleware function to handle errors.
 * @returns {Promise<void>} - This function does not return a value; it sends a response or calls the next middleware.
 * @throws {ApiError.badRequest} - Throws an `ApiError` if the ID is invalid or an internal error occurs.
 * @throws {ApiError.notFound} - Throws an `ApiError` if the item is not found.
 */
const deleteItem = async (req, res, next) => {
    try {
        const itemID = req.params.id;

        // Validate input to ensure no falsy values
        if (!itemID) {
            throw ApiError.badRequest(messages.errors.nullData("Item", "id"));
        }

        // Find the existing item
        const itemToDelete = await findRecordByField("id", itemID, Item);
        if (!itemToDelete) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Item")
            );
        }

        await itemToDelete.destroy();

        // Log success message
        console.log(messages.success("Item", "deleted"));

        return res.json({ message: messages.success("Item", "deleted") });
    } catch (e) {
        return next(
            ApiError.badRequest(
                messages.errors.general("deleting", "Item", e.message)
            )
        );
    }
};

module.exports = deleteItem;
