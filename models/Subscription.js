const { createEmbed } = require('../utils/embedBuilder');

module.exports = {
    name: 'subscribe',
    description: 'View and manage your subscription options',
    execute(message) {
        const embed = createEmbed(
            'Subscription Plans',
            'Choose from the following subscription tiers:',
            '#FFD700'
        )
        .addField('Bronze Tier', 'Basic anti-raid, customizable welcome messages - $5/month', true)
        .addField('Silver Tier', 'Everything in Bronze + advanced moderation tools - $10/month', true)
        .addField('Gold Tier', 'Everything in Silver + priority support & custom embeds - $20/month', true);

        message.channel.send({ embeds: [embed] });
    },
};

