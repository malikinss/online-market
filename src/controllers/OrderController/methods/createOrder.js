const Order = require("../../../models/Orders/Orders");
const ApiError = require("../../../error/ApiError");
const OrderItemController = require("../../OrderItemController/OrderItemController");
const PaymentController = require("../../PaymentController/PaymentController");

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

        // create Payment record and get its ID
        const newPaymentId = await PaymentController.createRecord(
            req,
            res,
            next
        );

        // Validate if paymentId was created
        if (!newPaymentId) {
            throw ApiError.internal(messages.errors.nullData("Paymnet", "ID"));
        }

        // Create a new Order in the database
        const newOrder = await Order.create({
            userId,
            totalPrice: 0,
            status: "Unpaid",
            paymentId: newPaymentId,
        });
        if (!newOrder) {
            throw ApiError.internal(
                messages.errors.actionFailed("create", "Order")
            );
        }

        res.locals.orderId = newOrder.id;

        // Create OrderItems
        const createdOrderItems = [];
        for (let orderItemData of orderItems) {
            res.locals.orderItemReq = orderItemData;

            // Create a new OrderItem in the database
            await OrderItemController.createRecord(req, res, next);
            let newOrderItem = res.locals.orderItem;
            if (!newOrderItem) {
                throw ApiError.internal(
                    messages.errors.actionFailed("create", "OrderItem")
                );
            }

            createdOrderItems.push(newOrderItem);
        }

        // Log success message
        console.log(messages.success("Order", "created"));

        return res.json({
            order: newOrder,
            items: createdOrderItems,
        });
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("creating", "Order", e.message)
            )
        );
    }
};

module.exports = createOrder;
