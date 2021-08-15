import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {Link as Connect} from "react-router-dom";
import {useState} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
export function SignUp(){
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName:Yup.string().required('Last name is required'),
        email:Yup.string().required('Email is required'),
        password:Yup.string().required('Password is required'),
        confirmPassword:Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match"
          )
    })
    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({resolver : yupResolver(validationSchema)});
    const [msg,setMsg] = useState("");
    const [loading,setLoading] = useState("none");
    const signupFunction = (data) => {
        fetch('https://google-drive-ak-back-end.herokuapp.com/user/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
        .then(res=>setMsg(res.message))
        .then(res=>setLoading("none"))
        .catch(res=>console.log(res))
    }
    const onSubmit = (data) =>{
        setLoading("block");
        signupFunction(data);
    }
    const hideMsg = () => {
        setTimeout(() => setMsg(""), 1000*10);
    }
    
    return(
        <div style={{display:'grid',placeItems:'center'}}>
            <Paper variant="outlined" id="signup">
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',gap:'10px'}}>
                    <span style={{display:loading}}> <LinearProgress/> </span>
                    <h1>Sign Up</h1>
                    {msg==="green"?(
                        <p>Verification link has been sent to your email</p>
                    ):(
                        <p>{msg}</p>
                    )}
                    {msg?hideMsg():""}
                    <TextField {...register("firstName")} 
                    id="outlined-basic" label="Enter your first name" 
                    variant="outlined"/>
                    {errors.firstName && (
                        <span style={{ color: "crimson" }}> {errors.firstName.message} </span>
                    )}
                    <TextField {...register("lastName")} 
                    id="outlined-basic" label="Enter your last name" 
                    variant="outlined"/>
                    {errors.lastName && (
                        <span style={{ color: "crimson" }}> {errors.lastName.message} </span>
                    )}
                    <TextField {...register("email")} 
                    type="email"
                    id="outlined-basic" label="Enter your email" 
                    variant="outlined"/>
                    {errors.email && (
                        <span style={{ color: "crimson" }}> {errors.email.message} </span>
                    )}
                    <TextField {...register("password")} 
                    type="password" 
                    id="outlined-basic" label="Enter your password" 
                    variant="outlined"/>
                    {errors.password && (
                        <span style={{ color: "crimson" }}> {errors.password.message} </span>
                    )}
                    <TextField {...register("confirmPassword")} 
                    type="password" 
                    id="outlined-basic" label="confirm password" 
                    variant="outlined"/>
                    {errors.confirmPassword && (
                        <span style={{ color: "crimson" }}> {errors.confirmPassword.message} </span>
                    )}
                    <Button type="submit" variant="contained" color="primary"> Submit </Button>
                    <Link>
                        <Connect to="/">
                        Already have an account ? Login
                        </Connect>
                    </Link>
                </form>
            </Paper>
        </div>
    )
}