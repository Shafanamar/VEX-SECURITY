const Subscription = require('../models/Subscription'); // Import the Subscription model
const paymentSuccess = require('../events/paymentSuccess'); // Import the payment success handler

module.exports = {
    name: 'subscriptionPayment',
    async execute(paymentInfo) {
        const { userId, guildId, tier } = paymentInfo;

        // Validate payment information
        if (!userId || !guildId || !tier) {
            console.error("Invalid payment information received:", paymentInfo);
            return;
        }

        // Fetch the guild and member
        const guild = client.guilds.cache.get(guildId);
        if (!guild) {
            console.error("Guild not found:", guildId);
            return;
        }

        const member = guild.members.cache.get(userId);
        if (!member) {
            console.error("Member not found:", userId);
            return;
        }

        // Check if the user already has a subscription
        let subscription = await Subscription.findOne({ userId });
        if (subscription) {
            // Update the existing subscription tier
            subscription.tier = tier.charAt(0).toUpperCase() + tier.slice(1); // Capitalize the tier
            await subscription.save();
        } else {
            // Create a new subscription if one doesn't exist
            subscription = new Subscription({
                userId,
                tier: tier.charAt(0).toUpperCase() + tier.slice(1),
            });
            await subscription.save();
        }

        // Call the payment success handler to assign roles
        await paymentSuccess.execute(userId, guildId, tier);

        console.log(`Subscription updated for user ${userId} in guild ${guildId} to tier ${subscription.tier}`);
    },
};

