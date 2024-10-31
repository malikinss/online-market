const categoryMessages = {
    create: {
        success: "Category was successfully created!",
        generalError: (data) => `Error creating category: ${data}`,
    },

    update: {
        success: "Category was successfully updated!",
        generalError: (data) => `Error updating category: ${data}`,
    },

    show: {
        success: "Categories were successfully showed!",
        generalError: (data) => `Error showing categories: ${data}`,
    },

    delete: {
        success: "Category was successfully deleted!",
        generalError: (data) => `Error deleting category: ${data}`,
    },
};

module.exports = categoryMessages;
