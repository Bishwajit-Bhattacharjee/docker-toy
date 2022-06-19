const User = require('./model');

// helpers functions
const getActiveUserByID = async (userId) => {
    const user = await User.findOne({
        _id: userId,
        isDeleted: false
    });

    if (!user) {
        throw new Error("User does not Exist!");
    }
    return user;
};

module.exports = {
    getActiveUserByID
};