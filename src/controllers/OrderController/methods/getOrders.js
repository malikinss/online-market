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