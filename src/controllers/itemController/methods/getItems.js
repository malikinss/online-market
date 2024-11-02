const Item = require("../../../models/Items");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { findRecordsByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Fetches items from the database based on the provided category ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The middleware function to call the next middleware in the stack.
 * @throws {ApiError.badRequest} - If the category ID is falsy or an error occurs during fetching.
 * @throws {ApiError.notFound} - If no items are found for the provided category ID.
 * @returns {Promise<void>} - Returns a JSON response with the found items or calls the next middleware with an error.
 */
const getItems = async (req, res, next) => {
    try {
        const { categoryID } = req.query;

        // Validate input to ensure no falsy values
        containsFalsyValues([categoryID]);

        // Attempt to find the items in the database
        const items = await findRecordsByField("categoryId", categoryID, Item);

        // If the items are not found, throw a not found error
        if (!items) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Items")
            );
        }

        // Log success message to the console
        console.log(messages.success("Item", "found"));

        // Return the found items as a JSON response
        return res.json(items);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("fetching", "Items", e.message)
            )
        );
    }
};

module.exports = getItems;
