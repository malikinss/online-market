const Order = require("../../../models/Orders");
const Item = require("../../../models/Items");
const OrderItem = require("../../../models/OrderItems");

const ApiError = require("../../../error/ApiError");

const OrderController = require("../../OrderController/OrderController");
const PaymentController = require("../../paymentController/paymentController");

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
async create(req, res, next) {
    try {
        const { orderId, itemId, quantity } = req.body;

        // Check for falsy values in the orderItem fields
        checkForFalsyValues([orderId, itemId, quantity], next);

        // Check if an order with the given orderId exists
        let order = await Order.findByPk(orderId);

        if (!order) {
            order = await OrderController.create(req, res, next);
        }

        // Check if an item with the given itemId exists
        let item = await Item.findByPk(itemId);

        if (item) {
            const orderItem = await OrderItem.create({
                orderId: order.id,
                quantity,
                unitPrice: item.price,
            });

            // Update totalPrice in Order
            order.totalPrice += orderItem.totalPrice;
            await order.save();

            // Create Unpaid payment
            const payment = await PaymentController.create(req, res, next);
            if (payment) {
                await payment.save();
            }

            return res.json(orderItem);
        }
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}