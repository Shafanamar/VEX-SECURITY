const fs = require('fs');
const path = require('path');

// Log file path
const logFilePath = path.join(__dirname, '../logs/bot.log');

// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Function to log messages to the console and to a file
function log(message) {
    const timestamp = new Date().toISOString(); // Get current timestamp
    const logMessage = `[${timestamp}] ${message}`;

    // Log to console
    console.log(logMessage);

    // Append to log file
    fs.appendFile(logFilePath, logMessage + '\n', (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

// Function to log errors
function logError(error) {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] ERROR: ${error}`;
    console.error(errorMessage);

    // Append to log file
    fs.appendFile(logFilePath, errorMessage + '\n', (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

module.exports = {
    log,
    logError,
};

