import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
export function SignUp(){
    let history = useHistory();
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
    const onSubmit = (data) =>{
        console.log(data);
        fetch('https://google-drive-ak-back-end.herokuapp.com/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
        .then(res=>history.push('/login'));
        
    }
    return(
        <Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',justifyContent:'center',alignContent:'center'}}>
                    <h1>Sign Up</h1>
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
                    <TextField type="submit"/>
                </form>
            </Grid>
        </Grid>
    )
}