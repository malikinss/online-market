const Order = require("../../../models/Orders");
const Item = require("../../../models/Items");
const OrderItem = require("../../../models/OrderItems");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Create a new order item.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createOrderItem = async (req, res, next) => {
    try {
        //const { itemId, quantity } = req.body;
        //const orderId = res.locals.orderId;

        const { itemId, quantity } = res.locals.orderItemReq;
        const orderId = res.locals.orderId;

        // Check for falsy values in the orderItem fields
        containsFalsyValues([orderId, itemId, quantity]);

        // Check if an Order with the given orderId exists
        const order = await findRecordByField("id", orderId, Order);
        if (!order) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        // Check if an Item with the given orderId exists
        const item = await findRecordByField("id", itemId, Item);
        if (!item) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        // Create a new OrderItem in the database
        const newOrderItem = await OrderItem.create({
            orderId,
            quantity,
            unitPrice: item.price,
        });
        if (!newOrderItem) {
            throw new ApiError.internal(
                messages.errors.actionFailed("create", "OrderItem")
            );
        }

        // Update totalPrice in Order
        order.totalPrice += newOrderItem.totalPrice;
        await order.save();

        res.locals.orderItem = newOrderItem;

        // Log success message
        console.log(messages.success("OrderItem", "created"));
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("creating", "OrderItem", e.message)
            )
        );
    }
};

module.exports = createOrderItem;