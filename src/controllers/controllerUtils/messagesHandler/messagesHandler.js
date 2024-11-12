// ANSI color codes for console output
const colors = {
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
    white: "\x1b[37m",
    black: "\x1b[30m",
    gray: "\x1b[90m",
    orangeRed: "\x1b[38;2;255;69;0m",
    brightRed: "\x1b[91m",
    brightGreen: "\x1b[92m",
    brightYellow: "\x1b[93m",
    brightBlue: "\x1b[94m",
    brightMagenta: "\x1b[95m",
    brightCyan: "\x1b[96m",
    brightWhite: "\x1b[97m",
    reset: "\x1b[0m",
};

/**
 * Returns a colored string for console output.
 * @param {string} text - The text to be colored.
 * @param {string} color - The color name for the text (must be a valid color from the colors object).
 * @returns {string} - The colored text wrapped with ANSI codes.
 */
function coloredString(text, color) {
    // Check if the color is valid
    if (!colors[color]) {
        throw new Error(`Invalid color: ${color}`);
    }
    return `${colors[color]}${text}${colors.reset}`;
}

const messageTypes = {
    success: (text) => coloredString(text, "green"),
    error: (text) => coloredString(text, "orangeRed"),
};

const messages = {
    success: (entity, action) =>
        messageTypes.success(`${entity} was ${action} successfully`),
    errors: {
        actionFailed: (action, entity) =>
            messageTypes.error(`Failed to ${action} ${entity}`),
        general: (action, entity, data) =>
            messageTypes.error(
                `An error occurred while ${action} ${entity}: ${data}`
            ),
        nullData: (entity, field) =>
            messageTypes.error(`${entity} ${field} is required.`),
        notNumber: messageTypes.error("Required fields must be valid numbers."),
        requirements: (elements) =>
            messageTypes.error(`The ${element} does not meet the requirements`),
    },

    requirements: {
        firstName:
            "First name must contain only Latin letters and be between 2 and 20 symbols long.",
        lastName:
            "The last name must be longer than 1 symbol and contain only Latin letters.",
        email: "Email must contain only Latin letters and follow the format username@domain.country_code",
        password:
            "Password must have a length between 8 to 20 symbols and include a-z, A-Z, 0-9, and next special symbols: !@#$%^&*.",
        phone: "Phone number must start with 0 and be 10 digits long.",
        role: "Role must be either user or admin.",
        country:
            "The country name must contain only Latin letters, spaces, hyphens, apostrophes and must be between 2 and 100 characters long.",
        city: "The city name must contain only Latin letters, spaces, hyphens, apostrophes and must be between 2 and 100 characters long.",
        street: "The street name must contain only Latin letters, spaces, hyphens, apostrophes and must be between 2 and 100 characters long.",
        building: "The building number must be an integer from 1 to 9999.",
        appartment: "The apartment number must be an integer from 1 to 9999.",
        postal: "The postal code must be 7 digits long and comply with the Israeli postal code format.",
        status: "The order status must be in [Created, Paid, Awaiting payment, Payment error, Payment cancelled]",
        price: "The price must be a number with a maximum of 8 digits before the decimal point and no more than 2 digits after the decimal point.",
        img: "The image URL must end with .jpg, .jpeg, .png, or .gif",
    },
};

module.exports = { messages };
