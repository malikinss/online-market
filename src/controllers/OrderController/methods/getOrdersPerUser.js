const Order = require("../../../models/Orders");
const OrderItem = require("../../../models/OrderItems");
const ApiError = require("../../../error/ApiError");

const OrderItemController = require("../../OrderItemController/OrderItemController");
const PaymentController = require("../../PaymentController/PaymentController");

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
const getOrdersPerUser = (req, res, next) => {
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

        return res.json(userOrders);
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("finding", "User Orders", e.message)
            )
        );
    }
};

module.exports = getOrdersPerUser;
