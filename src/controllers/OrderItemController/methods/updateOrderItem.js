const OrderItem = require("../../../models/OrderItems/OrderItems");
const Order = require("../../../models/Orders/Orders");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/containsFalsyValues/dataValidations");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Updates an order item identified by its unique identifier.
 * This operation involves extracting the ID and update data from the request, validating the input, performing a database lookup to ensure the item exists, applying the update, and sending a response.
 * In case of errors, the process is interrupted and an appropriate error is forwarded.
 * @param {Object} req - The incoming request object carrying parameters and update data.
 * @param {Object} res - The response object used to return the outcome of the update operation.
 * @param {Function} next - A function to transfer control to the next middleware or error handler.
 * @returns {Object} - A JSON object with a message confirming the successful update.
 * @throws {ApiError} - Throws an error if the ID is invalid, the order item does not exist, or an issue occurs during the update process.
 */

const updateOrderItem = async (req, res, next) => {
    try {
        const orderItemId = req.params.id;
        if (!orderItemId) {
            throw ApiError.notFound(
                messages.errors.nullData("OrderItem", "ID")
            );
        }

        const newQuantity = req.body.quantity;
        if (!newQuantity) {
            throw ApiError.notFound(
                messages.errors.nullData("OrderItem", "new quantity")
            );
        }

        // Find the OrderItem by ID
        const orderItem = await findRecordByField("id", orderItemId, OrderItem);
        if (!orderItem) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "OrderItem")
            );
        }

        // Get current totalPrice (quantity * unitPrice)
        const oldOrderItemTotalPrice = orderItem.totalPrice;

        // Update quantity and trigger hooks to adjust the totalPrice
        orderItem.quantity = newQuantity;
        await orderItem.save();

        // Get updated totalPrice (newQuantity * unitPrice)
        const newOrderItemTotalPrice = orderItem.totalPrice;

        // Find the associated Order by ID
        const order = await findRecordByField("id", orderItem.orderId, Order);
        if (!order) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        // Calculate and update the new total price of the Order
        const newOrderTotalPrice =
            order.totalPrice - oldOrderItemTotalPrice + newOrderItemTotalPrice;
        order.totalPrice = newOrderTotalPrice;
        await order.save();

        // Log success message to the console
        console.log(messages.success("OrderItem", "update"));

        // Return the Updated OrderItem as a JSON response
        return res.json(orderItem);
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("updating", "OrderItem", e.message)
            )
        );
    }
};

module.exports = updateOrderItem;
