const Order = require("../../../models/Orders");
const { findRecordsByField } = require("../../controllerUtils/findHandlers");

/**
 * Get all orders per specific User.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getOrdersPerUser = (req, res, next) => {
    try {
        const { userId } = req.query;

        const query = userId ? { where: { userId } } : {};

        const userOrders = findRecordsByField("userId", userId, Order);

        return res.json(userOrders);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = getOrdersPerUser;
