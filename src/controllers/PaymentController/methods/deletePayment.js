const Payment = require("../../../models/Payments/Payments");
const ApiError = require("../../../error/ApiError");

const {
    findRecordByField,
} = require("../../controllerUtils/findHandlers/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Delete a payment by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {ApiError} If the ID is invalid or the deletion fails.
 */
const deletePayment = async (req, res, next) => {
    try {
        // Extract payment ID from request parameters or res object
        const paymentId = res.locals.paymentId;

        // Validate if the paymnent ID is provided
        if (!paymentId) {
            throw ApiError.badRequest(
                messages.errors.nullData("Payment", "Id")
            );
        }

        // Find the payment record by ID
        const payment = await findRecordByField("id", paymentId, Payment);

        // Validate if the Payment record is found
        if (!payment) {
            throw ApiError.notFound(
                messages.errors.actionFailed("delete", "Payment")
            );
        }

        // Delete Payment record
        await payment.destroy();

        // Log success message to console
        console.log(messages.success("Payment", "deleted"));
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("deleting", "Payment", e.message)
            )
        );
    }
};

module.exports = deletePayment;
