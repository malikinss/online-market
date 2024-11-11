const Payment = require("../../../models/Payments/Payments");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves a payment by its ID from the request parameters.
 * @param {Object} req - The request object, which includes the payment ID in the parameters.
 * @param {Object} res - The response object used to send back the payment data in JSON format.
 * @param {Function} next - The next middleware function for handling errors.
 * @throws {ApiError.notFound} - Thrown when a payment with the specified ID cannot be found.
 * @throws {ApiError.badRequest} - Thrown when the request is missing the payment ID or contains invalid data.
 */
const getPayment = async (req, res, next) => {
    try {
        // Get paymentID and check if it exists
        const paymentId = req.params.id;
        if (!paymentId) {
            throw ApiError.badRequest(
                messages.errors.actionFailed("pass", "paymentID")
            );
        }

        // Find payment by its ID and check if it found
        const payment = await findRecordByField("id", paymentId, Payment);
        if (!payment) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Payment")
            );
        }

        // Log success message to the console
        console.log(messages.success("Payment", "found"));

        // Return the found payment as a JSON response
        return res.json(payment);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("finding", "Payment", e.message)
            )
        );
    }
};

module.exports = getPayment;
