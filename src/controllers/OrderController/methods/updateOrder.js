const Order = require("../../../models/Orders");
const ApiError = require("../../../error/ApiError");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Update an order by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        // Validate if the order ID is provided
        if (!orderId) {
            throw new ApiError.badRequest(
                messages.errors.nullData("Order", "Id")
            );
        }

        const newStatus = req.body.status;
        // Validate if the new Order status is provided
        if (!newStatus) {
            throw new ApiError.badRequest(
                messages.errors.nullData("Order", "status")
            );
        }

        const order = await findRecordByField("id", orderId, Order);

        // Validate if the Order record are found
        if (!order) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        order.update({ status: newStatus });

        return res.json(order);
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("finding", "Order", e.message)
            )
        );
    }
};

module.exports = updateOrder;
