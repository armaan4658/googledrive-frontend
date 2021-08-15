import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Demo.css';

export function FileDropDemo({getLink}){
  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState("none");
  const onInputChange = (e) => {
      setFile(e.target.files[0]);
  }
  const onSubmit = (e) => {
    setLoading("block");
    e.preventDefault();
    const data = new FormData();
    data.append('image',file);
    axios.post(`https://google-drive-ak-back-end.herokuapp.com/user/upload`,data,{withCredentials:true})
    .then(res=>{
      if(res.data.message==="green"){
        const body = {
          "userId":localStorage.getItem("_id"),
          "key":res.data.data.key
        }
        axios.post(`https://google-drive-ak-back-end.herokuapp.com/user/uploaddb`,body,{withCredentials:true})
        .then(res=>{
          setLoading("none");
          if(res.data.message==="green"){
            getLink();
          }
        })
        .catch(res=>console.log(res))
      }
    })
    .catch(error=>console.log(error))
  }
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
           <div class="form-group files" style={{width:'65vw'}}>
             <label>Upload Your File </label>
             <input 
             type="file" 
             class="form-control" 
             multiple=""
             onChange={onInputChange}
             />
           </div>
            <LinearProgress style={{display:loading,width:'100%',overflow:'inherit'}}/>
           <Button type="submit" variant="contained" color="secondary">
                Submit
            </Button>
       </form>
    </Grid>
  );
};