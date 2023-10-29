/*
This function ensure that password is not sent to the client
*/
const User = require("../models/UserModel");

async function getUser(userId, includeGroups = false){
    const user = await User.findById(userId);
    if (!user) {
        return null;
    }
    user.password = undefined;
    user.__v = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.verified = undefined;

    if(includeGroups){
        user.groups = await user.groups;
    }
    else{
        user.groups = undefined;
    }
    return user;
}

module.exports = getUser;
