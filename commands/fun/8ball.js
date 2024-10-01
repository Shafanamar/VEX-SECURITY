module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question',
    execute(message) {
        const responses = [
            "Yes.",
            "No.",
            "Maybe.",
            "Definitely!",
            "I have no idea.",
            "Ask again later."
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    }
};
