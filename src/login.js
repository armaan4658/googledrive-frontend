import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));  
export function LogIn(){
    let history = useHistory();
    const validationSchema = Yup.object().shape({
        email:Yup.string().required('Email is required'),
        password:Yup.string().required('Password is required')
    }) 
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const onSubmit = (data) =>{
        fetch('https://google-drive-ak-back-end.herokuapp.com/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
        .then(res=>history.push('/drive'))

    }
    return(
        <Grid>
            {/* <Grid item xs={1} sm={1} md={2} lg={3} xl={3}></Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',justifyContent:'center',alignContent:'center'}}>
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
                    <TextField  type="submit"/>
                    <Button variant="contained" color="primary" onClick={()=>{
                        history.push('/signup');
                    }}>
                        Sign Up
                    </Button>
                    <Button variant="contained" color="primary" onClick={()=>{
                        history.push('/forgotpassword');
                    }}>
                        Forgot password
                    </Button>
                </form>
            </Grid>
            {/* <Grid item xs={1} sm={1} md={2} lg={3} xl={3}></Grid> */}
        
        
        </Grid>
    )
}