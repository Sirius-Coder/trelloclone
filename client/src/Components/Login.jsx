import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import { Grid, Paper, TextField,Button,Grow} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import logo from '../img/logo.png'
import axios from 'axios'
//Material UI Styles
const useStyles=makeStyles(theme=>({
    root:{
        boxSizing:'border-box',
        backgroundColor:'#026aa7',
        height:'100vh',
    },
    header:{
        background:'white'
    },
    main:{
        margin:'3em auto',
        width:'40%',
        padding:'1em',
        [theme.breakpoints.down('sm')]: {
            width:'80%',
          },
    },
    input:{
        width:'40%',
        [theme.breakpoints.down('sm')]: {
            width:'75%',
          },
    }
}))

export default function Login() {
const classes=useStyles()
const history=useHistory()
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[errorMsg,setErrorMsg]=useState('')
//login user
const login=async(e)=>{
    try{
        const response = await axios.post('/loginRoute',{email,password})
        if(response.data.success===true)
        history.push('/boards')
        else
        setErrorMsg(response.data.msg)
    }
    catch(e)
    {
        console.error(e)
    }
}
    return (
        <div className={classes.root}  >
            <Grid container alignItems='center' className={classes.header} >
                <Grid item xs={3}>
                <img src={logo} alt="Logo" style={{height:'3em',width:'10em'}} ></img>
                </Grid>
                <Grid item xs={8} align='right' style={{fontFamily:'Montserrat'}} >
                <h3>Made with ❤ in JS</h3>
                </Grid>
            </Grid>
            <Grow in={true} timeout={900} >
            <Paper  elevation={15} className={classes.main}>
            <Grid container alignItems="center" spacing={3} >
                <Grid item xs={12} align='center' style={{fontFamily:'Montserrat',fontSize:'1.2em'}} >
                    <h1>Login</h1>
                </Grid>
                <Grid item xs={12} align='center' >
                    <TextField variant='outlined' autoComplete type='email' size="small" label="Enter your E-mail" className={classes.input} onChange={(e)=>setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12} align='center' >
                    <TextField variant='outlined' type='password' size="small" label="Enter Password" className={classes.input} onChange={(e)=>setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12} align='center' >
                    <Button onClick={login} style={{backgroundColor:'#61bd4f',color:'white',width:'50%'}}> Login</Button>
                </Grid>
                <Grid item xs={12} align='center' style={{fontFamily:'Montserrat',color:'red'}} >
                    <p>{errorMsg}</p>
                </Grid>
                <Grid item xs={12}  style={{fontFamily:'Montserrat'}} >
                    <h4>Don't have an account <span><Link to='/signup'>Click here</Link></span> </h4>
                </Grid>
                </Grid>
                </Paper>
                </Grow>
        </div>
    )
}
