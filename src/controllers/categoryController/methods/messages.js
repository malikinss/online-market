const messages = {
    success: (entity, action) => `${entity} was ${action} successfully`,
    errors: {
        actionFailed: (action, entity) => `Failed to ${action} ${entity}`,
        general: (action, entity, data) => `Error ${action} ${entity}: ${data}`,
    },
};

module.exports = { messages };
