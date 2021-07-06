import {SignUp} from './signup';
import {LogIn} from './login';
import {ForgotPassword} from './forgotpassword';
import {Drive} from './drive';
import './App.css';
import TextField from '@material-ui/core/TextField';
import {
  Switch,
  Link,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ul style={{listStyle:'none',display:'flex',justifyContent:'space-around'}}>
        <li><Link to="/"><img alt="google drive icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1147px-Google_Drive_icon_%282020%29.svg.png" width="50px"></img></Link></li>
        <li>  <TextField label="search"></TextField></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
      </ul>
      
      
      
      <Switch>
            <Route path="/signup"> <SignUp/> </Route>
            <Route path="/login"> <LogIn/> </Route>
            <Route path="/drive"> <Drive/> </Route>
            <Route path="/forgotpassword"> <ForgotPassword/> </Route>
      </Switch>
    </div>
  );
}

export default App;
