const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, 'Username is required']
    },

    email: {
        type: String,
        unique : [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    } ,  
    bio: String,
    profileImage: {
        type: String,
        default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'  //'https://ik.imagekit.io/anurag28/default%20user%20image.jpg'
    },
    followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }],
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;