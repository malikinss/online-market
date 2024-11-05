const Order = require("../../../models/Orders");
const OrderItem = require("../../../models/OrderItems");
const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");

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
const getOrders = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const query = userId ? { where: { userId } } : {};

        const userOrders = await Order.findAll(query);

        return res.json(userOrders);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = getOrders;
