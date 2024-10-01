module.exports = {
    name: 'announce',
    description: 'Make an announcement in a specified channel',
    execute(message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("You don't have permission to do that!");

        const channel = message.mentions.channels.first();
        if (!channel) return message.reply("You need to mention a channel!");

        const announcement = args.slice(1).join(" ");
        if (!announcement) return message.reply("You need to specify the announcement text!");

        channel.send(announcement);
    }
};

