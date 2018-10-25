const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
 
    fullName: {
        type: String
    },
    emailId: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    address: {
        type: String
    },
    image: {
        type: String
    }
});

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;
