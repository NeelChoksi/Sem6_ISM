import Home from './pages/home/Home';
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Messenger from './pages/messenger/Messenger'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext'

function App() {
  const {user,isFetching,error,dispatch} = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path = "/" >
          {(user||localStorage.getItem('username'))?<Home />:<Register />}
        </Route>
        <Route path = "/messenger" >
          {!(user|| localStorage.getItem('username')) ? <Redirect to="/" /> : <Messenger />}
          {/*<Messenger/>*/}
        </Route>
        <Route path = "/login">
          {(user||localStorage.getItem('username'))?<Redirect to="/"/>:<Login />}
        </Route>
        <Route path = "/register">
          {(user||localStorage.getItem('username'))?<Redirect to="/"/>:<Register />}
        </Route>
        <Route path = "/profile/:username">
          {!(user||localStorage.getItem('username'))?<Redirect to="/"/>:<Profile />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
