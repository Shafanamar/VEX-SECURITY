const Subscription = require('../../models/Subscription'); // Subscription model to manage user subscriptions
const { MessageEmbed } = require('discord.js'); // Embed to provide information to users

module.exports = {
    name: 'subscribe',
    description: 'Subscribe to a premium tier (Bronze, Silver, Gold).',
    async execute(message, args) {
        // Check if a tier was provided
        if (!args.length) {
            return message.reply("Please specify a subscription tier: Bronze, Silver, or Gold.");
        }

        const tier = args[0].toLowerCase();
        const validTiers = ['bronze', 'silver', 'gold'];

        if (!validTiers.includes(tier)) {
            return message.reply("Invalid tier specified. Please choose Bronze, Silver, or Gold.");
        }

        // Check if the user is already subscribed
        const existingSubscription = await Subscription.findOne({ userId: message.author.id });

        if (existingSubscription) {
            return message.reply(`You are already subscribed to the **${existingSubscription.tier}** tier.`);
        }

        // Here, you would normally initiate a payment process (e.g., using Stripe or PayPal)
        // For this example, we'll just simulate a successful payment

        // Simulate payment success (replace this with your payment integration)
        const paymentSuccess = true; // Set to true to simulate successful payment

        if (paymentSuccess) {
            // Create a new subscription
            const newSubscription = new Subscription({
                userId: message.author.id,
                tier: tier.charAt(0).toUpperCase() + tier.slice(1), // Capitalize the tier name
            });

            await newSubscription.save();

            // Send a confirmation message
            const embed = new MessageEmbed()
                .setColor('#00FF00') // Green color for success
                .setTitle('Subscription Successful!')
                .setDescription(`You have successfully subscribed to the **${newSubscription.tier}** tier!`)
                .setTimestamp()
                .setFooter(`Thank you for your support!`);

            return message.channel.send({ embeds: [embed] });
        } else {
            return message.reply("There was an issue processing your payment. Please try again later.");
        }
    },
};

