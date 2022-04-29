import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import {AuthContext} from '../../context/AuthContext'
import {useContext,useState,useEffect,useRef} from 'react'
import axios from 'axios';
import {io} from 'socket.io-client';

export default function Messenger(){

  const [conversations, setConversations] = useState([]);
  const [currentChat , setCurrentChat] = useState(null);
  const [messages,setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  // const [socket,setSocket] = useState(null);
  const socket = useRef()

  const {user} = useContext(AuthContext);
  console.log(user)


  useEffect(()=>{
    // socket.current = io("ws://192.168.201.219:9900")
    // socket.current = io("ws://localhost:9900")

    socket.current = io("ws://192.168.201.219:8900")
    socket.current.on("getMessage", data =>{
      setArrivalMessage({
        sender : data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages(prev=>[...prev,arrivalMessage])
  },[arrivalMessage,currentChat])

  useEffect(()=>{
    socket.current.emit("addUser",user._id);
    socket.current.on("getUsers",users=>{
      console.log(users)
    })
  },[user])

  useEffect(()=>{
    // http://localhost:8800/api/conversations/6252bba23acb143e4d8632cb
    const getConversations = async()=>{
      try{
        const res = await axios.get(`/conversations/${user._id}`);
        console.log(res.data);
        setConversations(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getConversations();
  },[user._id])

  useEffect(()=>{
      const getMessages = async ()=>{
          try{
            const res =await axios.get(`/messages/${currentChat?._id}`)
            setMessages(res.data);
          }catch(err){
              console.log(err)
          }
      }
      getMessages();
  },[currentChat])


  // console.log(messages)

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  })



  const submitChat=async (e)=>{
    e.preventDefault();
    const msg = {
      sender: user._id,
      text:newMessage,
      conversationId:currentChat._id
    }

    const recvId = currentChat.members.find(m=>m !== user._id)

    socket.current.emit("sendMessage",{
      senderId:user._id,
      receiverId:recvId,
      text:newMessage
    })

    try{
      // http://localhost:8800/api/messages
      const res = await axios.post(`/messages/`,msg);
      setMessages([...messages,res.data]);
      setNewMessage("");
    }catch(err){
      console.log(err)
    }
  }
  return(
    <>
    <Topbar />
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c)=>{
              console.log(c);
              return(
                <div onClick={()=>setCurrentChat(c)}>
                <Conversation c={c} key={c._id} currUser={user} />
                </div>
              )
            })}
          </div>
        </div>

        <div className ="chatBox">
          <div className="chatBoxWrapper">
          {currentChat?
            <>
            <div className="chatBoxTop">
              {messages.map(m=>(
                <div ref={scrollRef}>
                <Message msg={m} own={m.sender === user._id} />
                </div>
              ))}
            {/*  <Message own />
              <Message /> */}
            </div>
            <div className="chatBoxBottom">
              <input placeholder="Enter message to be sent" className = "chatMessageInput"
                onChange = {(e)=>setNewMessage(e.target.value)}
                value = {newMessage}
              />
              <button className="chatSubmitButton" onClick={submitChat}>Send</button>
            </div>
          </>:<span className="noConverationText">Select a friend to chat with </span>}
          </div>
        </div>

        <div className = "chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline/>

          </div>
        </div>

    </div>
    </>
  );
}
