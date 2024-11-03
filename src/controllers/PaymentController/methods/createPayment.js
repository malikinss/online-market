const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Create a new order payment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createPayment = async (req, res, next) => {
    try {
        const orderID = req.body.id || res.locals.orderId;
        if (!orderID) {
            throw new ApiError.badRequest(
                messages.errors.nullData("Order", "id")
            );
        }

        // Create a new payment in the database
        const payment = await Payment.create({ orderID, status: false });
        if (!payment) {
            throw new ApiError.internal(
                messages.errors.actionFailed("create", "Payment")
            );
        }

        res.locals.payment = payment;

        // Log success message
        console.log(messages.success("Payment", "created"));
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("creating", "payment", e.message)
            )
        );
    }
};

module.exports = createPayment;
