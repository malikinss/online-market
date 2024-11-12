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
    },
};

module.exports = { messages };
