import { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import {FileDropDemo} from './filedrop';
import {Gallery} from './gallery';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
          width: '25px'
        },
      },
    },
  }))(MenuItem);  
export function Drive(){
    const [show,setShow] = useState("none");
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const logOut = () => {
        axios.get(`https://google-drive-ak-back-end.herokuapp.com/user/logout`)
        .then(res=>{
            if(res.data.message==="green"){
                localStorage.clear();
                history.push('/');
            }
        })
        .catch(res=>console.log(res))
        
    }
    const showFileDrop = () => {
        if(show==="none"){
            setShow("grid");
        }else{
            setShow("none");
        }
    }
    const [url,setUrl] = useState([]);
    const [msg,setMsg] = useState("");
    const getLink = () => {
        axios.get(`https://google-drive-ak-back-end.herokuapp.com/user/download/${localStorage.getItem("_id")}`,{withCredentials:true})
        .then(res=>{
            if(res.data.message==="green"){
                setUrl(res.data.url);
            }else{
                setMsg(res.data.message);
            }
        })
        .catch(res=>console.log(res))
    }
    try{
        useEffect(getLink,[]);
    }catch(e){
        console.log(e);
    }
    const goToProfile = () => {
        history.push('/profile');
    }
    const navStyle = {
        display:'flex',
        justifyContent:'space-around',
        background:'#00004d',
        color:'white',
        padding:'10px 0'
    }
    const textFieldStyle = {
        background:'white',
        borderRadius:'5px'
    }
    return(
        <div>
            <div style={navStyle}>
                <div style={{display:'flex'}}>
                    <img alt="gdrive logo" width="50px"height="50px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/220px-Google_Drive_icon_%282020%29.svg.png"/>
                    <h5>Drive</h5>
                </div>
                <TextField
                    id="input-with-icon-textfield"
                    placeholder="Search files"
                    variant="outlined"
                    style={textFieldStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                />
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon fontSize="large" style={{color:'white'}}/>
                    </Button>
                    <StyledMenu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <StyledMenuItem onClick={goToProfile}>
                            <ListItemText primary="Profile" />
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" style={{paddingLeft:'3px',paddingBottom:'3px'}}/>
                            </ListItemIcon>
                        </StyledMenuItem>
                        <StyledMenuItem onClick={logOut}>
                            <ListItemText primary="Logout" />
                            <ListItemIcon>
                                <PowerSettingsNewIcon fontSize="small" style={{color:'#b30000',paddingLeft:'3px'}}/>
                            </ListItemIcon>
                        </StyledMenuItem>
                    </StyledMenu>
                </div>
            </div>
            <div>
                    <Button variant="contained" color="secondary" onClick={showFileDrop}>
                        Add file
                    </Button>
            </div>
            <Grid style={{display:show,placeItems:'flex-start',marginLeft:'12px'}}>
                <FileDropDemo getLink={getLink}/>
            </Grid>
            <div>
                <Gallery url={url}/>
                {msg!=="green"?(
                    <p>{msg}</p>
                ):(
                    <p></p>
                )}
            </div>
            
        
        </div>
    )
}