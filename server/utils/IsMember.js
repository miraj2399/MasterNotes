const Group = require("../models/GroupModel");
const User = require("../models/UserModel");

async function isMember(userID, groupID) {
    const user = await User.findById(userID);
    const group = await Group.findById(groupID);

    if (!user || !group) {
        return false;
    }
    if (group.members.includes(userID)) {
        return true;
    }
    return false;
}

module.exports = isMember;