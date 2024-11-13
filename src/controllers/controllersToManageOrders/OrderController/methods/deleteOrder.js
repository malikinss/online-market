const Order = require("../../../../models/Orders/Orders");
const OrderItem = require("../../../../models/OrderItems/OrderItems");
const ApiError = require("../../../../middleware/errorHandling/ApiError/ApiError");

const OrderItemController = require("../../OrderItemController/OrderItemController");
const PaymentController = require("../../PaymentController/PaymentController");

const {
    findRecordByField,
    findRecordsByField,
} = require("../../../controllerUtils/findHandlers/findHandlers");
const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Removes an existing order from the system using its unique identifier.
 * @param {Object} req - Represents the request encapsulating client-provided details.
 * @param {Object} res - Facilitates the delivery of responses back to the client.
 * @param {Function} next - Transfers control to the subsequent middleware function.
 * @returns {Object} - Returns a structured JSON response confirming the deletion.
 * @throws {ApiError} - Throws an error if input data validation fails or if the order cannot be found.
 * @throws {ApiError} - Throws an error if there are issues while attempting to remove related order items.
 * @throws {ApiError} - Throws an error for failures encountered during the deletion of the order or related payment.
 */
const deleteOrder = async (req, res, next) => {
    try {
        // Extract order ID from request parameters
        const orderId = req.params.id;

        // Validate if the order ID is provided
        if (!orderId) {
            throw ApiError.badRequest(messages.errors.nullData("Order", "Id"));
        }

        // Find the Order record by ID
        const orderToDelete = await findRecordByField("id", orderId, Order);

        // Validate if the Order record is found
        if (!orderToDelete) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        // Put payment ID from order record to res object for deleting
        res.locals.paymentId = orderToDelete.paymentId;

        // Find the OrderItem records by order ID
        const orderItemsToDelete = await findRecordsByField(
            "orderId",
            orderId,
            OrderItem
        );

        // Go through each OrderItem for this Order and delete it
        for (let orderItem of orderItemsToDelete) {
            res.locals.orderItemId = orderItem.id;

            // Delete orderItem record for this order
            await OrderItemController.deleteRecord(req, res, next);
        }

        // Delete Order record
        await orderToDelete.destroy();

        // Delete payment record for this order
        await PaymentController.deleteRecord(req, res, next);

        // Log success message to console
        console.log(messages.success("Order", "deleted"));

        return res.json({ message: messages.success("Order", "deleted") });
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("deleting", "Order", e.message)
            )
        );
    }
};

module.exports = deleteOrder;
