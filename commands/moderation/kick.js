module.exports = {
    name: 'kick',
    description: 'Kick a user',
    async execute(message, args) {
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("You don't have permission to do that!");

        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                await member.kick();
                message.channel.send(`${user.tag} has been kicked.`);
            } else {
                message.channel.send("That user isn't in this guild!");
            }
        } else {
            message.channel.send("You didn't mention anyone to kick!");
        }
    }
};

