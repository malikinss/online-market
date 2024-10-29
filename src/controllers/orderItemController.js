const Order = require("../models/Orders");
const Item = require("../models/Items");
const OrderItem = require("../models/OrderItems");

const ApiError = require("../error/ApiError");

const OrderController = require("./orderController");
const PaymentController = require("./paymentController");

const checkForFalsyValues = require("../utils/falsyChecker");
const findByField = require("../utils/findByField");
/**
 * Controller for managing order items.
 */
class OrderItemController {
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

    /**
     * Get an orderItem by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async getOrderItemById(req, res, next) {
        try {
            const id = req.params.id;
            const orderItem = await findByField(id, OrderItem, next);
            return res.json(orderItem);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Get all order items for a specific order.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async getAllOrderItems(req, res, next) {
        try {
            const { orderId } = req.query;

            const query = orderId ? { where: { orderId } } : {};

            const orderItems = await OrderItem.findAll(query);

            return res.json(orderItems);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Update an orderItem by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async updateById(req, res, next) {
        try {
            const id = req.params.id;
            const { quantity } = req.body;

            // Check for falsy values in the payment fields
            checkForFalsyValues([quantity], next);

            const orderItem = await findByField(id, OrderItem, next);

            // Update quantity and trigger hooks to adjust the totalPrice
            orderItem.quantity = quantity;
            await orderItem.save();

            // Update totalPrice in Order
            const order = await Order.findByPk(orderItem.orderId);
            order.totalPrice =
                order.totalPrice - oldTotalPrice + orderItem.totalPrice;
            await order.save();

            return res.json(orderItem);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Delete an order by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async deleteById(req, res, next) {
        try {
            const id = req.params.id;

            const orderItem = await findByField(id, OrderItem, next);

            await orderItem.destroy();

            return res.json({ message: "OrderItem deleted successfully" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OrderItemController();
