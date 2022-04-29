import "./closeFriend.css"

export default function CloseFriend({closeFriend}){
  return(
    <div>
    <li className = "sidebarFriend">
      <img className = "sidebarFriendImg" src={closeFriend.profilePicture} alt="" />
      <span className = "sidebarFriendName">{closeFriend.username}</span>
    </li>
    </div>
  )
}
