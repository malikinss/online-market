const OrderItem = require("../../../models/OrderItems");
const ApiError = require("../../../error/ApiError");

const { findRecordsByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves all order items associated with a specific order identified by orderID.
 * This function acts as a middleware in an Express.js application, handling incoming requests to fetch the relevant order items from the database.
 * It performs validation checks and returns appropriate error messages if the orderID is not provided or if no order items are found.
 * @param {Object} req - The Express request object. It contains:
 * @param {Object} res - The Express response object, used to send back the desired HTTP response. It is used for:
 * @param {Function} next - The next middleware function in the Express middleware chain.
 * @throws {ApiError} If the orderID is missing, a bad request error is thrown with a descriptive message.
 * @throws {ApiError} If no order items are found for the given orderID, a not found error is thrown indicating that the requested order items do not exist in the database.
 */
const getOrderItems = async (req, res, next) => {
    try {
        // Retrieve the orderID from query parameters and validate it
        const orderID = req.query.orderID;
        if (!orderID) {
            throw ApiError.badRequest(
                messages.errors.actionFailed("pass", "orderID")
            );
        }

        // Find all OrderItems by orderID
        const orderItems = await findRecordsByField("id", orderID, OrderItem);
        if (!orderItems) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "OrderItems")
            );
        }

        // Log success message to the console
        console.log(messages.success("OrderItems", "found"));

        // Return the found OrderItems as a JSON response
        return res.json(orderItems);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("finding", "OrderItems", e.message)
            )
        );
    }
};

module.exports = getOrderItems;
