const Order = require("../../../models/Orders");
const ApiError = require("../../../error/ApiError");
const OrderItemController = require("../../OrderItemController/OrderItemController");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Create a new order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createOrder = async (req, res, next) => {
    try {
        const { userId, orderItems } = req.body;

        // Check for falsy values in the order fields
        containsFalsyValues([userId, orderItems]);

        // Create a new order in the database
        const newOrder = await Order.create({
            userId,
            totalPrice: 0,
            status: "Unpaid",
        });
        if (!newOrder) {
            throw new ApiError.internal(
                messages.errors.actionFailed("create", "Order")
            );
        }

        const newOrderID = newOrder.id;
        if (!newOrderID) {
            throw new ApiError.internal(
                messages.errors.actionFailed("create", "OrderId")
            );
        }

        // Log success message
        console.log(messages.success("Order", "created"));

        return res.json(newOrder);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("creating", "Order", e.message)
            )
        );
    }
};

module.exports = createOrder;
