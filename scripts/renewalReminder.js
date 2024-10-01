const mongoose = require('mongoose'); // MongoDB object modeling tool
const Subscription = require('../models/Subscription'); // Import the Subscription model
const { Client, Intents } = require('discord.js'); // Import Discord.js for interacting with Discord
require('dotenv').config(); // Load environment variables from .env file

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});

// Function to send renewal reminders
async function sendRenewalReminders() {
    const currentDate = new Date(); // Get the current date
    const reminderDays = 3; // Number of days before expiration to send the reminder

    // Calculate the date for reminders
    const reminderDate = new Date();
    reminderDate.setDate(currentDate.getDate() + reminderDays);

    // Find subscriptions that are expiring in the next 'reminderDays'
    const subscriptions = await Subscription.find({
        expirationDate: {
            $gte: currentDate,
            $lt: reminderDate,
        },
    });

    // Iterate through each subscription and send a reminder
    for (const subscription of subscriptions) {
        const guild = client.guilds.cache.get(subscription.guildId);
        if (guild) {
            const member = await guild.members.fetch(subscription.userId);
            if (member) {
                // Send a reminder message to the user
                member.send(`Hello ${member.user.username}, your subscription to the **${subscription.tier}** tier is expiring soon! Please renew it to continue enjoying the benefits.`);
                console.log(`Sent renewal reminder to ${member.user.username} for ${subscription.tier} subscription.`);
            } else {
                console.log(`Member not found for userId ${subscription.userId}`);
            }

