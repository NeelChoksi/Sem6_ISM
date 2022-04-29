import './login.css'
import {useRef,useContext} from 'react';
import {loginCall} from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'
import {Link} from 'react-router-dom';


export default function Login(){
  const email = useRef();
  const password = useRef();

  const {user,isFetching,error,dispatch} = useContext(AuthContext);

  const handleLoginSubmit= (e)=>{
    e.preventDefault();
    // console.log(email.current.value);
    // console.log(password.current.value);
    loginCall({email:email.current.value,password:password.current.value},dispatch);

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
          <form className = "loginBox" onSubmit={handleLoginSubmit}>
            <input type="email" placeholder="email" className="loginInput" ref ={email} required/>
            <input type="password" placeholder="password" className="loginInput" ref ={password} required/>
            <button className ="loginButton">{isFetching?"Loading...":"Login"}</button>
            <span className = "loginForgot">Forgot Password?</span>
            <Link to="/register">
            <button className = "loginRegisterButton"> Create new Account </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
