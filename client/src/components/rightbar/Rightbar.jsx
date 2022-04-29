import React,{useState,useEffect,useContext} from 'react';
import './rightbar.css';
import {Users} from '../../dummyData'
import Online from '../online/Online';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'
import {loginCall} from '../../apiCalls'
export default function Rightbar({user}){
  const [friends,setFriends] = useState([]);
  const {user:currUser,dispatch} = useContext(AuthContext);
  // 
  //
  // if(!currUser){
  //   const pass = prompt('Please enter your password again!');
  //   loginCall({
  //     email:localStorage.getItem("email"),
  //     password:pass
  //   },dispatch)
  // }
  const [followed,setFollowed] = useState(currUser.followings.includes(user?._id));

  useEffect(()=>{
    currUser.followings.includes(user?._id)
  },[user])

  useEffect(()=>{
    const getFriends = async()=>{
      try{
        // http://localhost:8800/api/users/friends/6252bba23acb143e4d8632cb
        const followingsList = await axios.get(`/users/friends/${user._id}`)
        setFriends(followingsList.data)
      }catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[""])


  const HomeRightbar = ()=>{
    return (
      <>
      <h4 className = "rightbarTitle">
        Online Friends
      </h4>


      <ul className = "rightbarFriendList">
        {Users.map(u=>(
          <Online key={u.id} user = {u} />
        ))}
      </ul>
      </>

    );
  }
  const handlFollowUser = async()=>{
    try{
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow",{userId:currUser._id})
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put("/users/"+user._id+"/follow",{userId:currUser._id})
        dispatch({type:"FOLLOW",payload:user._id})

      }
    }catch(err){
      console.log(err)
    }
    setFollowed(!followed)

  }
  const ProfileRightbar = ()=>{
    console.log(user)
    return(
      <>
        {user.username !== currUser.username &&
            <button className="rightbarFollowBtn" onClick={handlFollowUser}>
            {followed?"Unfollow":"Follow"}
            </button>
        }
        <h2 className="rightbarTitle">User Information</h2>
        <div className = "rightbarInfo">
          <div className = "rightbarInfoItem">
            <span className = "rightbarInfoKey">Username:</span>
            <span className = "rightbarInfoValue">{user.username}</span>
          </div>
          <div className = "rightbarInfoItem">
            <span className = "rightbarInfoKey">Email:</span>
            <span className = "rightbarInfoValue">{user.email}</span>
          </div>

        </div>
        <h2 className="rightbarTitle">User Followings</h2>
        <div className = "rightbarFollowings">
        {friends.map(f=>(

            <div className = "rightbarFollowing">
              <img className="rightbarFollowingImg" src={f.profilePicture} alt="" />
              <Link to={`/profile/${f.username}`} style={{textDecoration:"none"}}>
                <span className="rightbarFollowingName">{f.username}</span>
              </Link>
            </div>

        ))}

        </div>

      </>
    )
  }
  return(
    <div className="rightbar">
      <div className = "rightbarWrapper">
{
  user? <ProfileRightbar /> : <HomeRightbar/>
}
      </div>
    </div>
  );
}
