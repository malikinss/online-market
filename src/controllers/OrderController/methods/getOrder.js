const Order = require("../../../models/Orders/Orders");
const OrderItem = require("../../../models/OrderItems/OrderItems");
const Payment = require("../../../models/Payments/Payments");
const ApiError = require("../../../error/ApiError");

const {
    findRecordByField,
    findRecordsByField,
    findRecordByFieldInclude,
} = require("../../controllerUtils/findHandlers/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves an order along with its associated items and payment details.
 * @param {Object} req - The HTTP request object containing parameters for the order retrieval.
 * @param {Object} res - The HTTP response object to send the result.
 * @param {Function} next - Middleware function to pass control to the next handler in the stack.
 * @throws {ApiError} Throws an error if the order ID is missing, or if any associated records cannot be found.
 * @returns {Object} Returns a response containing the order, order items, and payment details.
 */
const getOrder = async (req, res, next) => {
    try {
        // Extract order ID from request parameters
        const orderId = req.params.id;

        // Validate if the order ID is provided
        if (!orderId) {
            throw ApiError.badRequest(messages.errors.nullData("Order", "id"));
        }

        // Find the Order record by ID
        const order = await findRecordByField("id", orderId, Order);

        // Validate if the Order record is found
        if (!order) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        // Find the Order record by ID
        const orderItems = await findRecordsByField(
            "orderId",
            orderId,
            OrderItem
        );

        // Validate if the Order record is found
        if (!orderItems) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "orderItems")
            );
        }

        // Find the Order record by ID
        const payment = await findRecordByField("id", order.paymentId, Payment);

        // Validate if the Order record is found
        if (!payment) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "payment")
            );
        }

        // Log success message to the console
        console.log(messages.success("Order", "found"));

        return res.json({ order, orderItems, payment });
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("finding", "Order", e.message)
            )
        );
    }
};

module.exports = getOrder;
