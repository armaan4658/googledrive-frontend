import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function ForgotPassword(){
    const validationSchema = Yup.object().shape({
        email:Yup.string().required('Email is required')
    });
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const onSubmit = (data) =>{
        // fetch('http://localhost:5000/login',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(data)
        // }).then(res=>res.json())
        // .then(res=>history.push('/drive'));
        console.log(data);

    }
    return(
        <Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',justifyContent:'center',alignContent:'center'}} >
                    <h1>Enter your email to get password reset link</h1>
                    <TextField {...register("email")}
                    type="email" 
                    id="outlined-basic" label="Enter your email" 
                    variant="outlined"/>
                    {errors.email && (
                        <span style={{ color: "crimson" }}> {errors.email.message} </span>
                    )}
                    <TextField  type="submit"/>
                </form>
            </Grid>
        </Grid>
    )
}