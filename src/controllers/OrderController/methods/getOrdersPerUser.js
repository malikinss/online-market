const Order = require("../../../models/Orders");
const OrderItem = require("../../../models/OrderItems");
const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");

const OrderItemController = require("../../OrderItemController/OrderItemController");
const PaymentController = require("../../PaymentController/PaymentController");

const getOrder = require("./getOrder");
const {
    findRecordByField,
    findRecordsByField,
} = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Get all orders per specific User.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getOrdersPerUser = async (req, res, next) => {
    try {
        // Extract User ID from request parameters
        const userId = req.params.id;

        // Validate if the User ID is provided
        if (!userId) {
            throw ApiError.badRequest(messages.errors.nullData("User", "Id"));
        }

        // Find the User Order records by userID
        const userOrders = findRecordsByField("userId", userId, Order);

        // Validate if the User Order records are found
        if (!userOrders) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "User Orders")
            );
        }

        const userOrdersFull = [];

        for (let order of userOrders) {
            const fullOrderData = {};

            // Find the Order record by ID
            const orderItems = await findRecordsByField(
                "orderId",
                order.id,
                OrderItem
            );

            // Validate if the Order record is found
            if (!orderItems) {
                throw ApiError.notFound(
                    messages.errors.actionFailed("find", "orderItems")
                );
            }

            // Find the Order record by ID
            const payment = await findRecordByField(
                "id",
                order.paymentId,
                Payment
            );

            // Validate if the Order record is found
            if (!payment) {
                throw ApiError.notFound(
                    messages.errors.actionFailed("find", "payment")
                );
            }

            fullOrderData.order = order;
            fullOrderData.orderItems = orderItems;
            fullOrderData.payment = payment;

            userOrdersFull.push(fullOrderData);
        }

        return res.json(userOrdersFull);
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("finding", "User Orders", e.message)
            )
        );
    }
};

module.exports = getOrdersPerUser;
