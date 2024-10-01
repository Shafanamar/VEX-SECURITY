const { Client, Intents } = require('discord.js');
const roles = require('../config/roles'); // Import the roles configuration

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {
        // Check if the user is a bot to prevent infinite loops
        if (user.bot) return;

        // Ensure the reaction is from a message in a guild (server)
        if (!reaction.message.guild) return;

        // Define role assignment based on emoji reactions
        const emojiRoleMapping = {
            '🔴': roles.bronze.name, // Assign Bronze role for the red circle emoji
            '🟡': roles.silver.name, // Assign Silver role for the yellow circle emoji
            '🟢': roles.gold.name, // Assign Gold role for the green circle emoji
        };

        // Get the role name based on the emoji reacted
        const roleName = emojiRoleMapping[reaction.emoji.name];
        if (roleName) {
            const guild = reaction.message.guild;
            const member = await guild.members.fetch(user.id); // Fetch the member who reacted

            // Find the role in the guild
            const role = guild.roles.cache.find(r => r.name === roleName);
            if (role) {
                try {
                    await member.roles.add(role); // Add the role to the member
                    console.log(`Assigned role "${roleName}" to ${user.tag}`);
                } catch (error) {
                    console.error(`Failed to assign role "${roleName}" to ${user.tag}:`, error);
                }
            }
        }
    },
};

