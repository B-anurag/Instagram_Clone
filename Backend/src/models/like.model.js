const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required: [true, 'Post id is required for creating a like']
    },
    users:{
        type: String,
        required: [true, 'Username is required for creating a like']    
    }
},{
    timeStamps: true
})

likeSchema.index({post:1, users:1}, {unique:true})

const likeModel = mongoose.model('like', likeSchema);

module.exports = likeModel;