import "./share.css";
import {useContext,useRef,useState} from 'react';
import {PermMedia,Label,Room , EmojiEmotions} from "@material-ui/icons"
import {AuthContext} from '../../context/AuthContext'
import axios from "axios"
export default function Share(){
  const {user} = useContext(AuthContext)
  console.log(user);
  const desc = useRef();
  const [file,setFile] = useState(null);
  const shareSubmitHandler = async(e)=>{
    e.preventDefault();
    const newPost = {
      userId:user._id,
      description : desc.current.value
    }
    try{
    await  axios.post("/posts",newPost);
    window.location.reload()
    
    }catch(err){
      console.log(err)
    }
  }
  return(

    <div className = "share">
      <div className = "shareWrapper">
        <div className = "shareTop">
          <img className = "shareProfileImg" src={user.profilePicture} alt=""  />
          <input ref={desc} placeholder={`type something @${user.username} , let others know`} type = "text" className = "shareInput" />
        </div>
        <hr className = "shareHr" />


        <form className = "shareBottom" onSubmit={shareSubmitHandler}>
            <div className = "shareOptions">
              <label htmlFor="file" className = "shareOption">
                <PermMedia  className = "shareIcon" />
                <span className = "shareOptionText"> Photo or video </span>
                <input style={{display:"none"}} type = "file" id="file" accept=".png,.jpeg,.jpg" onChange ={(e)=>setFile(e.target.files[0])}/>
              </label>
              <div className = "shareOption">
                <Label className = "shareIcon" />
                <span className = "shareOptionText"> Tag </span>
              </div>
              <div className = "shareOption">
                <Room className = "shareIcon" />
                <span className = "shareOptionText"> Location </span>
              </div>
              <div className = "shareOption">
                <EmojiEmotions className = "shareIcon" />
                <span className = "shareOptionText"> Feelings </span>
              </div>
            </div>
          <button className = "shareButton" type="submit">Share</button>
        </form>


      </div>

    </div>
  );
}
