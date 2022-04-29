export const LoginStart =(userCredentials)=>{
  type:"LOGIN_START"
}

export const LoginSuccess =(userResponse)=>{
  type:"LOGIN_SUCCESS",
  payload:userResponse,
}

export const LoginFailure =(error)=>{
  type:"LOGIN_FAILURE",
  payload:error
}
export const Logout =()=>{
  type:"LOGOUT"
}

export const Follow = (userId)=>({
  type:"FOLLOW",
  payload:userId
})
export const Unfollow = (userId)=>({
  type:"UNFOLLOW",
  payload:userId
})
