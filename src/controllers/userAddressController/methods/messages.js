const addressMessages = {
    create: {
        success: "Address successfully created",
        errors: {
            nullData: "Address data is required.",
            notNumber: "Building, apartment, and postal must be valid numbers.",
            modelCreation: "Failed to create user address model.",
            general: (data) => `Error creating address: ${data}`,
        },
    },
    show: {
        success: "Address successfully displayed",
        errors: {
            nullId: "Id is required.",
            find: "Failed to find address.",
            general: (data) => `Error fetching address: ${data}`,
        },
    },
    update: {
        success: "Address successfully updated",
        errors: {
            nullId: "Id is required.",
            find: "Failed to find address.",
            general: (data) => `Error updating address: ${data}`,
        },
    },
    delete: {
        success: "Address successfully deleted",
        errors: {
            nullId: "Id is required.",
            find: "Failed to find address.",
            general: (data) => `Error deleting address: ${data}`,
        },
    },
};

module.exports = { addressMessages };
