import './register.css'
import {useRef} from 'react';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios'
export default function Register(){
  const email = useRef();
  const password = useRef();
  const confPass = useRef();
  const username = useRef();
  const history = useHistory();

  const handleRegisterSubmit =async(e)=>{
    e.preventDefault();
    // console.log(email,password,confPass,username)
    if(password.current.value !== confPass.current.value){
      confPass.current.setCustomValidity("Password not matching!!")
    }else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try{
        await axios.post("/auth/register",user);
        history.push("/login")
      }catch(err){
        console.log(err)
      }

    }
  }

  return(
    <div className = "login">
      <div className = "loginWrapper">
        <div className = "loginLeft">
          <h3 className = "loginLogo">ISM Project</h3>
          <span className = "loginDesc">
              TLS Handshake done for End to End clients
           </span>
        </div>
        <div className = "loginRight">
          <form className = "loginBox" onSubmit={handleRegisterSubmit}>
            <input type="email" placeholder="email" ref={email} className="loginInput" required/>
            <input type="text" placeholder="username" ref={username} className="loginInput" required/>
            <input type="password" placeholder="password" ref={password} className="loginInput" minLength="6" required/>

            <input type="password" placeholder="confirm password" ref={confPass} className="loginInput" required />
            <button className ="loginButton" type="submit">Register</button>
            <Link to="/login">
            <button className = "loginRegisterButton"> Login Here </button>

            </Link>

          </form>
        </div>
      </div>
    </div>
  )
}
