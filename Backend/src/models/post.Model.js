const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default:''
    },
    imgUrl:{
        type: String,
        required: [true, 'Image is required for creating a post']

    },
    user:{
        ref:"users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required for creating a post']
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }]
})

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;