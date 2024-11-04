const OrderItem = require("../../../models/OrderItems");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Get an orderItem by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getOrderItem = async (req, res, next) => {
    try {
        // Get OrderItemID and check if it exists
        const orederItemID = req.params.id;
        if (!orederItemID) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("pass", "orderItemID")
            );
        }

        // Find OrderItem by its ID and check if it found
        const orderItem = await findRecordByField(
            "id",
            orederItemID,
            OrderItem
        );
        if (!orederItemID) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "OrderItem")
            );
        }

        // Log success message to the console
        console.log(messages.success("OrderItem", "found"));

        // Return the found OrderItem as a JSON response
        return res.json(orderItem);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("fetching", "OrderItem", e.message)
            )
        );
    }
};

module.exports = getOrderItem;
