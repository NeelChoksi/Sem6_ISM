import "./message.css"
import {format} from 'timeago.js'


export default function Message({own,msg}){
  return(
    <div className={`message ${own?"own":""}`}>
      <div className="messageTop">
        <img src="" alt="" className="messageImg"/>
        <p className={`messageText ${own?"own":""}`}> {msg?.text} </p>

      </div>
      <div className="messageBottom">
        {format(msg?.createdAt)}
      </div>


    </div>
  )
}
