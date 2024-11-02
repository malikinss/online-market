const messages = {
    success: (entity, action) => `${entity} was ${action} successfully`,
    errors: {
        notFound: "Payment record not found",
        actionFailed: (action, entity) => `Failed to ${action} ${entity}`,
        general: (action, data) => `Error ${action} payment: ${data}`,
    },
};

module.exports = { messages };
