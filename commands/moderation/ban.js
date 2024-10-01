module.exports = {
    name: 'ban',
    description: 'Ban a user',
    async execute(message, args) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("You don't have permission to do that!");

        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                await member.ban();
                message.channel.send(`${user.tag} has been banned.`);
            } else {
                message.channel.send("That user isn't in this guild!");
            }
        } else {
            message.channel.send("You didn't mention anyone to ban!");
        }
    }
};

