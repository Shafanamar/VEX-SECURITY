require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    token: process.env.DISCORD_TOKEN, // Your Discord bot token
    prefix: '!', // Command prefix for your bot
    mongoURI: process.env.MONGO_URI, // MongoDB connection string
    serverPort: process.env.PORT || 3000, // Port for the web server
    supportServer: 'https://discord.gg/YOUR_SUPPORT_SERVER_LINK', // Link to your support server
    websiteURL: 'https://yourwebsite.com', // Your website URL
    subscriptionPrices: {
        bronze: 5.00, // Price for Bronze tier
        silver: 10.00, // Price for Silver tier
        gold: 15.00 // Price for Gold tier
    },
    roles: {
        bronze: 'Bronze Subscriber', // Role name for Bronze tier
        silver: 'Silver Subscriber', // Role name for Silver tier
        gold: 'Gold Subscriber' // Role name for Gold tier
    }
};

