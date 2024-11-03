/**
 * Get all order items for a specific order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getOrderItems = async (req, res, next) => {
    try {
        const { orderId } = req.query;

        const query = orderId ? { where: { orderId } } : {};

        const orderItems = await OrderItem.findAll(query);

        return res.json(orderItems);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = getOrderItems;
