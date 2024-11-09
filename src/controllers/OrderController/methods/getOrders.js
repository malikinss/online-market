const Order = require("../../../models/Orders/Orders");
const ApiError = require("../../../error/ApiError");

const { findAllRecords } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves all order records from the database and sends them as a JSON response.
 * If no records are found, an error is thrown indicating that the requested resource is not available.
 * In case of any unexpected issues during the retrieval process, an internal server error is propagated.
 * @param {Object} req - The HTTP request object, containing any necessary query parameters and headers.
 * @param {Object} res - The HTTP response object, used to send the JSON response with the order records.
 * @param {Function} next - The middleware function to be called in case of an error, allowing for centralized error handling.
 * @returns {void} - Does not return a value explicitly but sends a JSON response if successful.
 * @throws {ApiError} - Throws an ApiError with a 'notFound' status if no order records are found.
 * @throws {ApiError} - Throws an ApiError with an 'internal' status if there is an error during the retrieval process.
 */
const getOrders = async (req, res, next) => {
    try {
        // Find all order records from the database
        const orders = await findAllRecords(Order);

        // Validate if the Order records are found
        if (!orders) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Orders")
            );
        }

        // Log success message
        console.log(messages.success("Orders", "found"));

        // Return the categories as a JSON response
        return res.json(orders);
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("finding", "Orders", e.message)
            )
        );
    }
};

module.exports = getOrders;
