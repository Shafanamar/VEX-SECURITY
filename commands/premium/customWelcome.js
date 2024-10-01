const Subscription = require('../../models/Subscription'); // Ensure you have the Subscription model for checking premium status

module.exports = {
    name: 'customWelcome',
    description: 'Set a custom welcome message for new members.',
    async execute(message, args) {
        // Check if the user has premium subscription
        const subscription = await Subscription.findOne({ userId: message.author.id });
        
        if (!subscription || (subscription.tier !== 'Gold' && subscription.tier !== 'Silver')) {
            return message.reply("You need to have a premium subscription to use this command!");
        }

        // Check if a welcome message was provided
        const welcomeMessage = args.join(' ');
        if (!welcomeMessage) {
            return message.reply("Please provide a welcome message!");
        }

        // Save the welcome message to the server settings or database (example assumes a ServerSettings model)
        // You need to create this model to store server-specific settings
        const serverSettings = await ServerSettings.findOne({ guildId: message.guild.id });
        if (!serverSettings) {
            // Create a new entry if it doesn't exist
            await new ServerSettings({ guildId: message.guild.id, welcomeMessage }).save();
        } else {
            // Update existing entry
            serverSettings.welcomeMessage = welcomeMessage;
            await serverSettings.save();
        }

        message.channel.send(`Custom welcome message has been set: "${welcomeMessage}"`);
    },
};

