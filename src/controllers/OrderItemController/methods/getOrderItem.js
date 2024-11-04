const OrderItem = require("../../../models/OrderItems");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves an order item by its unique identifier.
 * This function handles the request to find an order item based on the ID provided in the request parameters.
 * If the ID is missing or the order item is not found, appropriate error responses are sent.
 * @param {Object} req - The request object, containing request parameters and any relevant data.
 * @param {Object} res - The response object, used to send data or error messages back to the client.
 * @param {Function} next - The next middleware function to handle errors.
 *
 * @throws {ApiError.badRequest} If the orderItemID is not provided.
 * @throws {ApiError.notFound} If the order item with the specified ID is not found.
 */
const getOrderItem = async (req, res, next) => {
    try {
        // Get OrderItemID and check if it exists
        const orderItemID = req.params.id;
        if (!orderItemID) {
            throw ApiError.badRequest(
                messages.errors.actionFailed("pass", "orderItemID")
            );
        }

        // Find OrderItem by its ID and check if it found
        const orderItem = await findRecordByField("id", orderItemID, OrderItem);
        if (!orderItem) {
            throw ApiError.notFound(
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
                messages.errors.general("finding", "OrderItem", e.message)
            )
        );
    }
};

module.exports = getOrderItem;
