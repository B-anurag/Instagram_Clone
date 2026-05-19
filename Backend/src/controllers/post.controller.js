const postModel = require('../models/post.Model');
const {ImageKit, toFile } = require ('@imagekit/nodejs'); 
const likeModel = require('../models/like.model');
const jwt = require('jsonwebtoken')

//initialise imagekit 
const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
})

async function createPostController(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: 'Image file is required'
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'), //required
        fileName: "Test",//required
        folder: "cohort-2-insta-clone-posts"
    })
    // res.send(file);

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: 'Post created successfully',
        post
    })
}

async function getPostController(req, res) {
  
        const userId = req.user.id;
        const posts = await postModel.find({
            user: userId
        })

        res.status(200).json({
            message:"Posts fetched successfully.",
            posts
        })
}

async function getPostDetailsController(req, res){
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId) ;

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId;
     
    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden: You don't have access to this post"
        })
     }

     return res.status(200).json({
        message:"Post details fetched successfully",
        post
     })
}

async function likePostController(req, res){
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: token missing or invalid' })
    }

    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    // like.model expects `users` field (string). Use that key.
    const like = await likeModel.create({
        post: postId,
        users: username
    })

    return res.status(201).json({
        message: 'Post liked successfully',
        like
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}