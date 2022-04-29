import "./profile.css";
import {useState,useEffect} from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import {useParams} from 'react-router';


export default function Profile(){
  const [user,setUser] = useState({});
  const params = useParams();
  // console.log(params.username)
  useEffect(()=>{
    // console.log("feed rendered")
    const fetchUser = async ()=>{
      // http://localhost:8800/api/users/624c4acddc743f8df8a931ac
      const res = await axios.get(`/users?username=${params.username}`)
      // console.log(res);
      setUser(res.data)
    }
    fetchUser();
  },[params.username])


  return(
    <>
      <Topbar />
      <div className = "profile">
        <Sidebar />
        <div className ="profileRight">
          <div className="profileRightTop">
            <div className = "profileCover">
              <img className = "profileCoverImg" src = {user.coverPicture} alt = "cover picture" />
              <img className = "profileUserImg" src = {user.profilePicture} alt = "user picture" />
            </div>
            <div className = "profileInfo">
              <h4 className = "profileInfoName">{user.username} </h4>
              <span className ="profileInfoDesc">{"Hey there"}</span>
            </div>
          </div>

          <div className="profileRightBottom">
            <Feed username={params.username} view/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
