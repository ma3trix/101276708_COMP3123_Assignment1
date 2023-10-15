const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    password: {
        type: String,
        maxlength: 50,
    },
    // Add other fields as needed
});

module.exports = mongoose.model('User', userSchema);