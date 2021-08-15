import {SignUp} from './signup';
import {LogIn} from './login';
import {ForgotPassword} from './forgotpassword';
import {ResetPassword} from './resetpassword';
import {Verify} from './verify';
import {Drive} from './drive';
import {Profile} from './profile';
import {Edit} from  './edit';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import React from 'react';
function App() {
  return (
    <div className="App">
          <Switch>
                <Route exact path="/"> <LogIn/> </Route>
                <Route path="/signup"> <SignUp/> </Route>
                <Route path="/drive"> <Drive/> </Route>
                <Route path="/forgotpassword"> <ForgotPassword/> </Route>
                <Route path="/passwordreset/:id"> <ResetPassword/> </Route>
                <Route path="/verify/:id"> <Verify/> </Route>
                <Route path="/profile"> <Profile /> </Route>
                <Route path="/edit"> <Edit /> </Route>
          </Switch>
    </div>
  );
}

export default App;
