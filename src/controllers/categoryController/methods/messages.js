const categoryMessages = {
    success: (action) => `Category ${action} successfully`,
    errors: {
        notFound: "Category record not found",
        general: (action, data) => `Error ${action} category: ${data}`,
    },
};

module.exports = categoryMessages;
