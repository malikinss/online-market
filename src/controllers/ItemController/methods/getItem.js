const Item = require("../../../models/Items/Items");
const ApiError = require("../../../error/ApiError");

const {
    findRecordByField,
} = require("../../controllerUtils/findHandlers/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/containsFalsyValues/dataValidations");
const {
    messages,
} = require("../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Fetches an item based on the provided ID from the request parameters.
 *
 * @param {Object} req - The request object that contains route parameters, including the item ID.
 * @param {Object} res - The response object used to send the retrieved item as JSON.
 * @param {Function} next - The middleware function to call in case of an error.
 * @returns {Promise<void>} - Returns nothing but sends a JSON response or calls the next middleware on error.
 */
const getItem = async (req, res, next) => {
    try {
        // Extract item ID from the request parameters
        const itemID = req.params.id;

        // Validate that the item ID does not contain any falsy values
        containsFalsyValues([itemID]);

        // Attempt to find the item in the database using the provided ID
        const item = await findRecordByField("id", itemID, Item);

        // If the item is not found, throw a not found error
        if (!item) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Item")
            );
        }

        // Log success message to the console
        console.log(messages.success("Item", "found"));

        // Return the found item as a JSON response
        return res.json(item);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("fetching", "Item", e.message)
            )
        );
    }
};

module.exports = getItem;
