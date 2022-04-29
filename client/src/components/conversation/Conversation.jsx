import './conversation.css'
import {useState,useEffect} from 'react'
import axios from 'axios';
export default function Conversation({c,currUser}){
  const [user,setUser] = useState(null);

  console.log(c)
  console.log(currUser)

  useEffect(()=>{
    const friendId = c.members.find((m)=> m!== currUser._id)
    console.log(friendId)

    const getUser = async()=>{
      try{
        const res = await axios.get('/users?userId='+friendId)
        console.log(res)
        setUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser();
  },[])

  return (
    <div className = "conversation">
      <img className="conversationImg" src="" alt = "" />
      <span className = "conversationName">{user?user.username:""}</span>
    </div>
  )
}
