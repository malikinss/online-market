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