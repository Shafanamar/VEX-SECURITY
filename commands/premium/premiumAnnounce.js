const { MessageEmbed } = require('discord.js');
const Subscription = require('../../models/Subscription'); // Ensure you have the Subscription model for checking premium status

module.exports = {
    name: 'premiumAnnounce',
    description: 'Send an announcement as a premium user.',
    async execute(message, args) {
        // Check if the user has a premium subscription
        const subscription = await Subscription.findOne({ userId: message.author.id });

        if (!subscription || (subscription.tier !== 'Gold' && subscription.tier !== 'Silver')) {
            return message.reply("You need to have a premium subscription to use this command!");
        }

        // Check if an announcement message was provided
        const announcementMessage = args.join(' ');
        if (!announcementMessage) {
            return message.reply("Please provide an announcement message!");
        }

        // Create an embed for the announcement
        const embed = new MessageEmbed()
            .setColor('#FFAA00') // You can customize the color
            .setTitle('📢 Announcement')
            .setDescription(announcementMessage)
            .setTimestamp()
            .setFooter(`Announcement from ${message.author.tag}`, message.author.displayAvatarURL());

        // Send the announcement to the specified channel or the current channel
        const channel = message.mentions.channels.first() || message.channel;

        // Send the embed message
        await channel.send({ embeds: [embed] });
    },
};

