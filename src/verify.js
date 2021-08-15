import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useParams} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import {useEffect, useState} from 'react';
import axios from "axios";

export function Verify(){
    const {id} = useParams()
    const validationSchema = Yup.object().shape({
        otp:Yup.string().required('Otp need to be entered to verify')
    });
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const [loading,setLoading] = useState("none");
    const [msg,setMsg] = useState("");
    const [email,setEmail] = useState("");
    const onSubmit = (data) =>{
        const DataSend = {
            "otp":data.otp,
            "email":email
        }
        setLoading("block");
        axios.patch(`https://google-drive-ak-back-end.herokuapp.com/user/otp`,DataSend)
        .then(res=>{
            if(res.data){
                setLoading("none");
                setMsg(res.data.message)
            }
        })
        .catch(res=>console.log(res))
    }
    const getUserData = ()=>{
        fetch(`https://google-drive-ak-back-end.herokuapp.com/user/get/${id}`,{
            method:'GET'
        }).then(res=>res.json())
        .then(res=>setEmail(res.email))
    }
    try{
        useEffect(getUserData,[]);
    }catch(e){
        console.log(e)
    }
    const hideMsg = () => {
        setTimeout(() => setMsg(""), 1000*10);
    }
    return(
        <div style={{display:'grid',placeItems:'center'}}>
            <Paper variant="outlined" id="forgotpassword">
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',gap:'10px'}} >
                    <span style={{display:loading}}> <LinearProgress/> </span>
                    <h1>Enter otp to verify your account</h1>
                    <TextField {...register("otp")}
                    type="text" 
                    id="outlined-basic" label="Enter your otp" 
                    variant="outlined"/>
                    {errors.otp && (
                        <span style={{ color: "crimson" }}> {errors.otp.message} </span>
                    )}
                    <Button  type="submit" variant="contained" color="primary"> Verify </Button>
                    {msg?(
                        msg==="green"?(
                            <p>your account is verified</p>
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