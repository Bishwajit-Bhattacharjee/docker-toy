const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    mobileNo: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted: {
        type: Boolean, 
        default: false 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User