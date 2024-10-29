const Order = require("../models/Orders");

const checkForFalsyValues = require("../utils/falsyChecker");
const findByField = require("../utils/findByField");

const handleError = require("../error/errorHandler");

/**
 * Controller for managing orders.
 */
class OrderController {
    /**
     * Create a new order.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async create(req, res, next) {
        try {
            const { userId } = req.body;

            // Check for falsy values in the order fields
            checkForFalsyValues([userId], next);

            // Create a new order in the database
            const order = await Order.create({
                userId,
                totalPrice: 0,
                status: "Created",
            });

            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Get an order by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async getOrderById(req, res, next) {
        try {
            const id = req.params.id;

            const order = await findByField(id, Order, next);

            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Get all orders per specific User.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async getAllUserOrders(req, res, next) {
        try {
            const { userId } = req.query;

            const query = userId ? { where: { userId } } : {};

            const userOrders = await Order.findAll(query);

            return res.json(userOrders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Update an order by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async updateById(req, res, next) {
        try {
            const id = req.params.id;
            const { status, totalPrice } = req.body;

            // Check for falsy values in the payment fields
            checkForFalsyValues([status, totalPrice], next);

            const order = await findByField(id, Order, next);

            // Update the order fields, keeping existing values if not provided
            Object.assign(order, {
                status: status || order.status,
                totalPrice: totalPrice || order.totalPrice,
            });

            // Save the updated order to the database
            await order.save();

            return res.json(order);
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

            const order = await findByField(id, Order, next);

            await order.destroy();

            return res.json({ message: "Order deleted successfully" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OrderController();
