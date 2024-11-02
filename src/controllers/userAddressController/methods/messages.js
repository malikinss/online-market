const messages = {
    success: (entity, action) => `${entity} was ${action} successfully`,
    errors: {
        actionFailed: (action, entity) => `Failed to ${action} ${entity}`,
        general: (action, entity, data) => `Error ${action} ${entity}: ${data}`,
        nullData: (entity, field) => `${entity} ${field} is required.`,
        notNumber: "Required fields must be valid numbers.",
    },
};

module.exports = { messages };
