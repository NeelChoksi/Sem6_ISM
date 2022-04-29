import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './post.css'
import {MoreVert} from '@material-ui/icons';
// import {Users} from '../../dummyData'
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import {AuthContext} from '../../context/AuthContext';



export default function Post({post}){
  console.log(post)
  let {user:currUser} = useContext(AuthContext);
  if(!currUser){
    currUser = {
      username:localStorage.getItem("username"),
      _id:localStorage.getItem("userId"),
      profilePicture:localStorage.getItem("profilePicture")
    }
  }
  const [like,setLike] = useState(post.likes.length);
  const [isLiked,setIsLiked] = useState(false);
  const [user,setUser] = useState({});

  useEffect(()=>{
    setIsLiked(post.likes.includes(currUser._id))
  },[currUser._id,post.likes])

  useEffect(()=>{
    // console.log("feed rendered")
    const fetchUser = async ()=>{
      // http://localhost:8800/api/users/624c4acddc743f8df8a931ac
      const res = await axios.get(`/users?userId=${post.userId}`)
      // console.log(res);
      setUser(res.data)
    }
    fetchUser();
    },[post.userId])


  const likeHandler = ()=>{
    setLike(isLiked? like-1 : like+1);
    setIsLiked(!isLiked);

    // http://localhost:8800/api/posts/:postid/like
    // userId

    try{
      axios.put(`/posts/${post._id}/like`,{userId:currUser._id});

    }catch(err){

    }
  }


  return(


    <div className = "post">
      <div className = "postWrapper">
        <div className = "postTop">
          <div className = "postTopLeft">
          <Link to={`profile/${user.username}`}>
            <img className = "postProfileImg" alt="" src={user.profilePicture}/>
          </Link>
            <span className = "postUsername"> {user.username} </span>
            <span className = "postDate"> {format(post.createdAt)} </span>
          </div>


          <div className = "postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className = "postCenter">
          <span className= "postText">{post?.description} </span>
          <img src = {post.img} alt = "" className = "postImg" />
        </div>

        <div className = "postBottom">
          <div className = "postBottomLeft">
            <span className = "likeIcon" onClick={likeHandler}>LIKE</span>
            <span className = "postLikeCounter">{like} likes</span>
          </div>

          <div className = "postBottomRight">
            <span className = "postCommentText">{post.comment} comments</span>
          </div>

        </div>

      </div>
    </div>
  );
}
