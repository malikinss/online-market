const Order = require("../../../../models/Orders/Orders");
const OrderItem = require("../../../../models/OrderItems/OrderItems");
const Payment = require("../../../../models/Payments/Payments");
const ApiError = require("../../../../middleware/errorHandling/ApiError/ApiError");
const {
    findRecordByField,
    findRecordsByField,
} = require("../../../controllerUtils/findHandlers/findHandlers");
const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

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
            throw new ApiError.badRequest(
                messages.errors.nullData("User", "Id")
            );
        }

        // Find the User Order records by userID
        const userOrders = await findRecordsByField("userId", userId, Order);

        // Validate if the User Order records are found
        if (!userOrders) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "User Orders")
            );
        }

        // Create array for storing detailed order data
        const userOrdersFull = await Promise.all(
            userOrders.map(async (order) => {
                // Retrieve order items and payment for each order in parallel
                const [orderItems, payment] = await Promise.all([
                    findRecordsByField("orderId", order.id, OrderItem),
                    findRecordByField("id", order.paymentId, Payment),
                ]);

                // Validate if order items and payment exist
                if (!orderItems) {
                    throw ApiError.notFound(
                        messages.errors.actionFailed("find", "orderItems")
                    );
                }

                if (!payment) {
                    throw ApiError.notFound(
                        messages.errors.actionFailed("find", "payment")
                    );
                }

                // Return structured data for each order
                return {
                    order,
                    orderItems,
                    payment,
                };
            })
        );

        // Log success message to the console
        console.log(messages.success("User orders", "found"));

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
