const Subscription = require('../../models/Subscription'); // Ensure you have the Subscription model for checking user subscriptions

module.exports = {
    name: 'manageSubscription',
    description: 'Manage your subscription status.',
    async execute(message, args) {
        // Fetch the user's subscription from the database
        const subscription = await Subscription.findOne({ userId: message.author.id });

        // If the user has no subscription
        if (!subscription) {
            return message.reply("You currently don't have a subscription. Use `!subscribe` to subscribe.");
        }

        // If user provides an argument for changing subscription tier
        if (args.length === 1) {
            const newTier = args[0].toLowerCase();
            const validTiers = ['bronze', 'silver', 'gold'];

            if (!validTiers.includes(newTier)) {
                return message.reply("Please specify a valid tier to change to: Bronze, Silver, or Gold.");
            }

            // Update the user's subscription tier
            subscription.tier = newTier.charAt(0).toUpperCase() + newTier.slice(1); // Capitalize the first letter
            await subscription.save();
            return message.reply(`Your subscription has been updated to **${subscription.tier}**!`);
        }

        // If no argument is provided, show the user's current subscription status
        return message.reply(`Your current subscription tier is **${subscription.tier}**.`);
    },
};

