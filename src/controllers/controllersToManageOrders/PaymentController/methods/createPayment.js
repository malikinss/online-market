const Payment = require("../../../../models/Payments/Payments");
const ApiError = require("../../../../middleware/errorHandling/ApiError/ApiError");
const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Create a new order payment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createPayment = async (req, res, next) => {
    try {
        // Create a new payment in the database
        const newPayment = await Payment.create({ status: false });
        if (!newPayment) {
            throw ApiError.internal(
                messages.errors.actionFailed("create", "Payment")
            );
        }

        // Log success message
        console.log(messages.success("Payment", "created"));

        // Return paymnetId
        return newPayment.id;
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("creating", "payment", e.message)
            )
        );
    }
};

module.exports = createPayment;
