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