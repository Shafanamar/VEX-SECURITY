module.exports = {
    name: 'ping',
    description: 'Check the bot\'s latency',
    execute(message) {
        message.channel.send('Pong! 🏓').then(sent => {
            sent.edit(`Pong! Latency is ${sent.createdTimestamp - message.createdTimestamp}ms.`);
        });
    }
};

