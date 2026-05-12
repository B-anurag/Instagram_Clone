const postModel = require('../models/post.Model')
const {ImageKit, toFile } = require ('@imagekit/nodejs'); 

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

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}