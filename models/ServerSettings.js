const { Schema, model } = require('mongoose');

const serverSettingsSchema = new Schema({
    guildId: { type: String, required: true, unique: true }, // Unique identifier for each guild
    welcomeMessage: { type: String, default: "Welcome to the server!" }, // Default welcome message
});

module.exports = model('ServerSettings', serverSettingsSchema);
