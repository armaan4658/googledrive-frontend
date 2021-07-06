
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
export function Drive(){
    const [show,setShow] = useState(false);
    return(
        <>
        <Grid style={{display:'flex'}}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}><h3>No files to display</h3></Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}> <IconButton onClick={()=>setShow(!show)}><AddIcon/><h6>upload</h6></IconButton>  </Grid>
        </Grid>
        <Grid>
            {show===true?<input type="file"/>:""}     
        </Grid>
        </>
    )
}