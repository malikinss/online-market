const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Get a payment by ID.
 * @param {Object} req - The request object containing payment ID in params.
 * @param {Object} res - The response object for sending back the payment data.
 * @param {Function} next - The next middleware function for error handling.
 * @throws {ApiError.notFound} - If the payment is not found.
 * @throws {ApiError.badRequest} - If the request contains invalid data.
 */
const getPayment = async (req, res, next) => {
    try {
        // Get paymentID and check if it exists
        const paymentID = req.params.id;
        if (!paymentID) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("pass", "paymentID")
            );
        }

        // Find payment by its ID and check if it found
        const payment = await findRecordByField("id", id, Payment);
        if (!payment) {
            throw new ApiError.notFound(
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
                messages.errors.general("fetching", "Payment", e.message)
            )
        );
    }
};

module.exports = getPayment;
