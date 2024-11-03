const Order = require("../../../models/Orders");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Get an order by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getOrder = async (req, res, next) => {
    try {
        const orderID = req.params.id;
        if (!orderID) {
            throw new ApiError.badRequest(
                messages.errors.nullData("Order", "id")
            );
        }

        // Log success message
        console.log(messages.success("Order", "found"));

        const order = await findRecordByField("id", orderID, Order);
        if (!order) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        // Log success message to the console
        console.log(messages.success("Order", "found"));

        return res.json(order);
    } catch (e) {
        return next(
            ApiError.internal(messages.general("finding", "Order", e.message))
        );
    }
};

module.exports = getOrder;
