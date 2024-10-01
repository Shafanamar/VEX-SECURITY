const { MessageEmbed } = require('discord.js');

module.exports = {
    createEmbed(title, description, color = '#0099ff') {
        return new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color);
    }
};

