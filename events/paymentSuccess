// models/paymentSuccess.js
module.exports = {
    name: 'paymentSuccess',
    async execute(userId, guildId, tier) {
        const guild = client.guilds.cache.get(guildId);
        const member = guild.members.cache.get(userId);
        
        if (tier === 'Bronze') {
            const role = guild.roles.cache.find(role => role.name === 'Bronze Subscriber');
            if (role) member.roles.add(role);
        } else if (tier === 'Silver') {
            const role = guild.roles.cache.find(role => role.name === 'Silver Subscriber');
            if (role) member.roles.add(role);
        } else if (tier === 'Gold') {
            const role = guild.roles.cache.find(role => role.name === 'Gold Subscriber');
            if (role) member.roles.add(role);
        }
    },
};
