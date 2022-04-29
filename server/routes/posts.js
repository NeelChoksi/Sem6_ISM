const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js")


// create a post
router.post("/",async(req,res)=>{
  const newPost = new Post(req.body);

  try{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  }catch(err){
    res.status(500).json(err);
  }
})
// update a post
router.put("/:id",async(req,res)=>{
  const post = await Post.findById(req.params.id);
  if(post.userId === req.body.userId){
    await post.updateOne({$set:req.body});
    res.status(200).json("post has been updated");

  }else{
    res.status(403).json("You can update only your post");
  }
})
// delete a post
router.delete("/:id",async(req,res)=>{
  const post = await Post.findById(req.params.id);
  if(post.userId === req.body.userId){
    await post.deleteOne();
    res.status(200).json("post has been deleted");
  }else{
    res.status(403).json("You can delete only your post");
  }
})

// like a post
router.put("/:id/like",async(req,res)=>{
  const post = await Post.findById(req.params.id);
  try{
    if(!post.likes.includes(req.body.userId)){
      await post.updateOne({$push:{likes:req.body.userId}});
      res.status(200).json("The post has been liked");
    }else{
      await post.updateOne({$pull:{likes:req.body.userId}});
      res.status(200).json("The post has been removed from liked posts");
    }
  }catch(err){
    res.status(500).json(err);
  }
})



// get a post

router.get("/:id",async(req,res)=>{
  try{
    const post =await Post.findById(req.params.id);
    res.status(200).json(post);
  }catch(err){
    res.status(500).json(err);
  }
})


// get timeline posts
router.get("/timeline/:userId",async(req,res)=>{
  // let postArray = [];
  try{
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId:currentUser._id});
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendID)=>{
        return Post.find({userId:friendID})
      })
    )
    res.status(200).json(userPosts.concat(...friendPosts));
  }catch(err){
    res.status(500).json(err);
    console.log(1)
  }
})


// user all posts
router.get("/profile/:username",async(req,res)=>{
  try{
    const currentUser = await User.findOne({username:req.params.username});

    const userPosts = await Post.find({userId:currentUser._id});
    res.status(200).json(userPosts);
  }catch(err){
    res.status(500).json(err);
    console.log(1)
  }
})



// router.get("/",(req,res)=>{
//   res.send("post page")
// })
//



module.exports = router;
