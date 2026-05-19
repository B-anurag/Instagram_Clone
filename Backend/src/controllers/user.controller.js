const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {
    const followerUsername = req.user.username; //jo follow kr rha h uska use name 
    const followeeUsername = req.params.username; // jisko follow krna h uska username

    if(followerUsername == followeeUsername ){
            return res.status(400).json({
                message:"You cannot follow yourself"
            })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message:`User you are trying to follow does not exists`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`Already following ${followeeUsername} `,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        followee: followeeUsername
    })
     
    res.status(201).json({
        message:`you are now following ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message:`User you are trying to unfollow does not exists`
        })
    }

    const isUserFollowing = await followModel.findOne({
         follower: followerUsername,
        followee: followeeUsername
    })

   if(!isUserFollowing){
    return res.status(400).json({
        message:`You are not following ${followeeUsername}`
    })
   }
     
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })

   
}
module.exports = { 
    followUserController,
    unfollowUserController
}