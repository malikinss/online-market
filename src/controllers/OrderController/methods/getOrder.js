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