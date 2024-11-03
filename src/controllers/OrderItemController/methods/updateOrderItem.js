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