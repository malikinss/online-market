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