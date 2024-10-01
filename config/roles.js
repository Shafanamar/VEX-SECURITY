module.exports = {
    bronze: {
        name: 'Bronze Subscriber', // Role name for Bronze tier
        permissions: [
            'VIEW_CHANNEL',
            'SEND_MESSAGES',
            'READ_MESSAGE_HISTORY'
        ],
        description: 'Basic access with limited features.'
    },
    silver: {
        name: 'Silver Subscriber', // Role name for Silver tier
        permissions: [
            'VIEW_CHANNEL',
            'SEND_MESSAGES',
            'READ_MESSAGE_HISTORY',
            'ADD_REACTIONS'
        ],
        description: 'Enhanced access with additional features.'
    },
    gold: {
        name: 'Gold Subscriber', // Role name for Gold tier
        permissions: [
            'VIEW_CHANNEL',
            'SEND_MESSAGES',
            'READ_MESSAGE_HISTORY',
            'ADD_REACTIONS',
            'MANAGE_MESSAGES'
        ],
        description: 'Full access with all features available.'
    }
};

