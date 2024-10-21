const Payment = require("../models/Payments");
const ApiError = require("../error/ApiError");

class PaymentController {
    async create(req, res, next) {
        try {
            const { status } = req.body;
            const payment = await Payment.create({ status });

            return res.json(payment);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const payments = await Payment.findAll();
            return res.json(payments);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const payment = await Payment.findOne({ where: { id } });

            if (!payment) {
                return next(ApiError.notFound("Payment not found"));
            }

            payment.status = status || address.status;

            await payment.save();

            return res.json(payment);
        } catch (e) {
            next(e);
        }
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params;

            const payment = await Payment.findOne({ where: { id } });

            if (!payment) {
                return next(ApiError.notFound("Payment not found"));
            }

            await payment.destroy();

            return res.json({ message: "Payment deleted successfully" });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PaymentController();
