const OrderItem = require("../../../models/OrderItems");
const Order = require("../../../models/Orders");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Update an order item by ID.
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the order item to update.
 * @param {Object} req.body - The body of the request.
 * @param {number} req.body.quantity - The new quantity for the order item.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateOrderItem = async (req, res, next) => {
    try {
        const orderItemId = req.params.id;
        const newQuantity = req.body.quantity;

        // Validate input to ensure no falsy values
        containsFalsyValues([orderItemId, newQuantity]);

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
            ApiError.badRequest(
                messages.errors.general("updating", "OrderItem", e.message)
            )
        );
    }
};

module.exports = updateOrderItem;
