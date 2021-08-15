import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useParams} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import {useState} from 'react';

export function ResetPassword(){
    const {id} = useParams();
    const validationSchema = Yup.object().shape({
        password:Yup.string().required('Password is required'),
        confirmPassword:Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match"
          )
    });
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const [loading,setLoading] = useState("none");
    const [msg,setMsg] = useState("");
    const onSubmit = (data) =>{
        setLoading("block");
        fetch(`https://google-drive-ak-back-end.herokuapp.com/user/update/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>res.json())
        .then(res=>setMsg(res.message))
        .then(res=>setLoading("none"))
        .catch(res=>console.log(res))
    }
    const hideMsg = () => {
        setTimeout(() => setMsg(""), 1000*10);
    }
    return(
        <div style={{display:'grid',placeItems:'center'}}>
            <Paper variant="outlined" id="forgotpassword">
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',gap:'10px'}} >
                    <span style={{display:loading}}> <LinearProgress/> </span>
                    <h1>Password reset</h1>
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
                    <Button  type="submit" variant="contained" color="primary"> reset password </Button>
                    
                    {msg?(
                        msg==="green"?(
                            <p>your password has been reset</p>
                        ):(
                            <p> {msg} </p>
                        )
                    ):""}
                    {msg?hideMsg():""}
                </form>
            </Paper>
        </div>
    )
}