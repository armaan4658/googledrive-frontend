import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {Link as Connect} from "react-router-dom";
import axios from "axios";

export const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));  
export function LogIn(){
    const history = useHistory();
    const [loading,setLoading] = useState("none");
    const [msg,setMsg] = useState("");
    const validationSchema = Yup.object().shape({
        email:Yup.string().required('Email is required'),
        password:Yup.string().required('Password is required')
    }) 
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const loginFunction =async (data) => {
        axios.post('https://google-drive-ak-back-end.herokuapp.com/user/login',data,{withCredentials:true})
        .then(res=>{
            if(res.data){
                setLoading("none");
                setMsg(res.data.message);
            }
            if(res.data.message==="green"){
                localStorage.setItem("_id",res.data._id);
                history.push('/drive');
            }
        })
        .catch(res=>console.log(res))
        
    }
    const onSubmit = (data) =>{
        setLoading("block");
        loginFunction(data); 
    }
    const hideMsg = () => {
        setTimeout(() => setMsg(""), 1000*10);
    }
    
    return(
        <div style={{display:'grid',placeItems:'center'}}>
            <Paper variant="outlined" id="login">
                <form onSubmit={handleSubmit(onSubmit)}style={{display:'grid',gap:'10px'}}>
                    <span style={{display:loading}}> <LinearProgress/> </span>
                    <h1>Log In</h1>
                    <TextField  {...register("email")} 
                    type="email" 
                    id="outlined-basic" label="Enter your email" 
                    variant="outlined"/>
                    {errors.email && (
                        <span style={{ color: "crimson" }}> {errors.email.message} </span>
                    )}
                    <TextField  {...register("password")} 
                    type="password" 
                    id="outlined-basic" label="Enter your password" 
                    variant="outlined"/>
                    {errors.password && (
                        <span style={{ color: "crimson" }}> {errors.password.message} </span>
                    )}
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <Link>
                        <Connect to="/signup">
                        Sign Up
                        </Connect>
                    </Link>
                    <Link>
                        <Connect to="/forgotpassword">
                        Forgot password
                        </Connect>
                    </Link>
                    {msg!=="green"?(
                        <p>{msg}</p>
                    ):(
                        <p></p>
                    )}
                    {msg?hideMsg():""}
                </form>
            </Paper>
        </div>
    )
}