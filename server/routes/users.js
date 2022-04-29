const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.js");


// update user
router.put("/:id",async(req,res)=>{
  if(req.body.userId === req.params.id || req.body.isAdmin){
    if(req.body.password){
      try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
      }catch(err){
        return res.status(500).json(err);
        console.log("1");

      }
    }

    try{
      const user = await User.findByIdAndUpdate(req.params.id,{
        $set : req.body
      });
      res.status(200).json("Account updated");
    }catch(err){
      return res.status(500).json(err);
      console.log("2");
    }


  }else{
    res.send(403).json("You can update only your account!");
  }
})


//delete user
router.delete("/:id",async(req,res)=>{
  if(req.body.userId === req.params.id || req.body.isAdmin){

    try{
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account deleted");
    }catch(err){
      return res.status(500).json(err);
      console.log("2");
    }
  }else{
    res.send(403).json("You can delete only your account!");
  }
})
//lh:8800/users?userId=324234134
//lh:8800/users?username=neel2
//get a user
router.get("/",async(req,res)=>{
  const userId = req.query.userId;
  const username = req.query.username;
  try{
    const user = userId ? await User.findById(userId)
                        : await User.findOne({username: username});
    const {password,updateAt,cryptography,...other} = user._doc;
    res.status(200).json(other);
  }catch(err){
    res.status(500).json(err);
  }
})


// get friends of the user
router.get("/friends/:userId",async(req,res)=>{

  try{
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map(follower=>{
        return User.findById(follower)
      })
    );

    let followingsList = [];
    friends.map(f=>{
      const{username,_id,profilePicture} = f;
      followingsList.push({username,_id,profilePicture})
    })
    res.status(200).json(followingsList);
  }catch(err){
    res.status(500).json(err);
  }

})



//follow a user
router.put("/:id/follow",async(req,res)=>{
  if(req.body.userId !== req.params.id){
    try{
      const user_to_be_followed = await User.findById(req.params.id);
      const curr_user = await User.findById(req.body.userId);

      if(!user_to_be_followed.followers.includes(req.body.userId)){
        await user_to_be_followed.updateOne({$push: {followers:req.body.userId}});
        await curr_user.updateOne({$push:{followings:req.params.id}});
        res.status(200).json("User has been followed");
      }else{
        return res.status(403).json("You are already following the user");
        console.log(1)
      }
    }catch(err){
      console.log(err)
    }



  }else{
    res.status(403).json("You cannot follow yourself!");
    console.log(2)

  }
})


// unfollow a user
router.put("/:id/unfollow",async(req,res)=>{
  if(req.body.userId !== req.params.id){
    try{
      const user_to_be_unfollowed = await User.findById(req.params.id);
      const curr_user = await User.findById(req.body.userId);

      if(user_to_be_unfollowed.followers.includes(req.body.userId)){
        await user_to_be_unfollowed.updateOne({$pull: {followers:req.body.userId}});
        await curr_user.updateOne({$pull:{followings:req.params.id}});
        res.status(200).json("User has been unfollowed");
      }else{
        return res.status(403).json("You are not following the user");
        console.log(1)
      }
    }catch(err){
      console.log(err)
    }



  }else{
    res.status(403).json("You cannot unfollow yourself!");
    console.log(2)

  }
})





// router.get("/",(req,res)=>{
//   res.send("welcome to users page");
//
// })

module.exports = router;
