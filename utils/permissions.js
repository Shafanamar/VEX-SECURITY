const { Permissions } = require('discord.js');

/**
 * Check if the member has the required permissions.
 * @param {GuildMember} member - The Discord member to check permissions for.
 * @param {Array} requiredPermissions - An array of required permission strings.
 * @returns {boolean} - True if the member has all required permissions, false otherwise.
 */
function hasPermissions(member, requiredPermissions) {
    if (!member || !member.permissions) {
        throw new Error("Invalid member provided for permission check.");
    }

    // Check if the member has all required permissions
    const missingPermissions = requiredPermissions.filter(permission => !member.permissions.has(permission));
    
    if (missingPermissions.length > 0) {
        console.log(`Missing permissions for ${member.user.tag}: ${missingPermissions.join(', ')}`);
        return false;
    }
    return true;
}

/**
 * Check if a user has the required role.
 * @param {GuildMember} member - The Discord member to check the role for.
 * @param {String} roleName - The name of the role to check for.
 * @returns {boolean} - True if the member has the role, false otherwise.
 */
function hasRole(member, roleName) {
    if (!member || !member.roles) {
        throw new Error("Invalid member provided for role check.");
    }

    // Check if the member has the specified role
    const hasRole = member.roles.cache.some(role => role.name === roleName);
    if (!hasRole) {
        console.log(`${member.user.tag} does not have the required role: ${roleName}`);
    }
    return hasRole;
}

module.exports = {
    hasPermissions,
    hasRole,
};

