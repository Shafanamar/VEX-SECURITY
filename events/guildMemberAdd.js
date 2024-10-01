const ServerSettings = require('../models/ServerSettings');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const serverSettings = await ServerSettings.findOne({ guildId: member.guild.id });
        const channel = member.guild.systemChannel || member.guild.channels.cache.find(ch => ch.name === 'general'); // Fallback to a default channel
        
        if (channel) {
            const welcomeMessage = serverSettings ? serverSettings.welcomeMessage : "Welcome to the server!";
            channel.send(`${welcomeMessage} ${member}`);
        }
    }
};


