const Item = require("../../../models/Items");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Updates an existing item in the database based on the provided item ID and new data.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {Object} req.body - The new data for the item.
 * @param {Object} res - The response object.
 * @param {function} next - The middleware function to call the next middleware in the stack.
 * @throws {ApiError.badRequest} If the item ID is falsy or required fields are missing.
 * @throws {ApiError.notFound} If the item to update is not found in the database.
 * @returns {Promise<void>} Returns a JSON response with the updated item or calls the next middleware with an error.
 */
const updateItem = async (req, res, next) => {
    try {
        const itemID = req.params.id;

        // Validate input to ensure no falsy values
        if (!itemID) {
            throw ApiError.badRequest(messages.errors.nullData("Item", "id"));
        }

        const { name, description, price, stock, categoryId } = req.body;

        // Check for required fields
        containsFalsyValues([name, description, price, stock, categoryId]);

        // Find the existing item
        const itemToUpdate = await findRecordByField("id", itemID, Item);
        if (!itemToUpdate) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Address")
            );
        }

        // Update the item
        await itemToUpdate.update({
            name,
            description,
            price,
            stock,
            categoryId,
        });

        // Log success message
        console.log(messages.success("Item", "updated"));

        return res.json(itemToUpdate);
    } catch (e) {
        return next(
            ApiError.badRequest(
                messages.errors.general("updating", "Item", e.message)
            )
        );
    }
};

module.exports = updateItem;
