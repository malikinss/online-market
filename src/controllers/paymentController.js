const Payment = require("../models/Payments");

const checkForFalsyValues = require("../utils/falsyChecker");
const findByField = require("../utils/findByField");

const handleError = require("../error/errorHandler");

/**
 * Controller for managing order payments.
 */
class PaymentController {
    /**
     * Create a new order payment.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async create(req, res, next) {
        try {
            const { orderId } = req.body;

            // Check for falsy values in the payment fields
            checkForFalsyValues([orderId], next);

            // Create a new payment in the database
            const payment = await Payment.create({ orderId, status: false });

            return res.json(payment);
        } catch (error) {
            handleError(next, "creating payment", error);
        }
    }

    /**
     * Get a payment by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const payment = await findByField(id, Payment, next);
            return res.json(payment);
        } catch (error) {
            handleError(next, "fetching payment", error);
        }
    }

    /**
     * Update a payment by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // Check for falsy values in the payment fields
            checkForFalsyValues([status], next);

            const payment = await findByField(id, Payment, next);

            // Update the payment status field, keeping existing value if not provided
            Object.assign(payment, { status: status || payment.status });

            // Save the updated payment to the database
            await payment.save();

            return res.json(payment);
        } catch (error) {
            handleError(next, "updating payment", error);
        }
    }

    /**
     * Delete a payment by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async deleteById(req, res, next) {
        try {
            const { id } = req.params;

            const payment = await findByField(id, Payment, next);

            await payment.destroy();

            return res.json({ message: "Payment deleted successfully" });
        } catch (error) {
            handleError(next, "deleting payment", error);
        }
    }
}

module.exports = new PaymentController();
