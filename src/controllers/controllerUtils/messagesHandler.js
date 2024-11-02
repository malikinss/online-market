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
 * @param {string} color - The color name for the text.
 * @returns {string} - The colored text wrapped with ANSI codes.
 */
function coloredString(text, color) {
    // Return the text with the specified color
    return `${colors[color]}${text}${colors.reset}`;
}

const messages = {
    success: (entity, action) =>
        coloredString(`${entity} was ${action} successfully`, "green"),
    errors: {
        actionFailed: (action, entity) => `Failed to ${action} ${entity}`,
        general: (action, entity, data) =>
            `An error occured while ${action} ${entity}: ${data}`,
        nullData: (entity, field) => `${entity} ${field} is required.`,
        notNumber: "Required fields must be valid numbers.",
    },
};

module.exports = { messages };
