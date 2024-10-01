const prefix = '!'; // Assuming `!` is the command prefix.

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = message.client.commands.get(commandName);
        if (command) {
            command.execute(message, args);
        }
    }
};

