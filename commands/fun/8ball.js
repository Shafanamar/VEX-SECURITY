module.exports = {
    name: 'roll',
    description: 'Roll a dice',
    execute(message) {
        const roll = Math.floor(Math.random() * 6) + 1;
        message.channel.send(`You rolled a ${roll}! 🎲`);
    }
};

