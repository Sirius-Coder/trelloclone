import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {Grow, Grid, Paper, TextField,Button} from '@material-ui/core';
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
export default function Signup() {
    const classes= useStyles()
    const history=useHistory()
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[errorMsg,setErrorMsg]=useState('')
    //OnSubmit Function 
    const submitForm=async(e)=>{
        //Perform Validation for email
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(email)===false)
        setErrorMsg('Invalid E-mail Format')
        else{
            setErrorMsg('')
            try{
                const response = await axios.post('/signupRoute',{name,email,password})
                if(response.data.success===true)
                history.push('/login')
                else
                setErrorMsg(response.data.msg)
            }
            catch(e)
            {
                console.error(e)
            }
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
                    <h1>Signup</h1>
                </Grid>
                <Grid item xs={12} align='center' >
                    <TextField variant='outlined' size="small" label="Enter your Name" className={classes.input} onChange={e=>setName(e.target.value)} />
                </Grid>
                <Grid item xs={12} align='center' >
                    <TextField variant='outlined' type="email" autoComplete required size="small" label="Enter your E-mail" className={classes.input} onChange={e=>setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12} align='center' >
                    <TextField variant='outlined' type='password' required size="small" label="Enter Password" className={classes.input} onChange={e=>setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12} align='center' >
                    <Button type='submit' onClick={submitForm} style={{backgroundColor:'#61bd4f',color:'white',width:'50%'}}> Signup</Button>
                </Grid>
                <Grid item xs={12} align='center' style={{fontFamily:'Montserrat',color:'red'}} >
                    <p>{errorMsg}</p>
                </Grid>
                <Grid item xs={12}  style={{fontFamily:'Montserrat'}} >
                    <h4>Already have an account <span><Link to='/login'>Click here</Link></span> </h4>
                </Grid>
                </Grid>
                </Paper>
                </Grow>
        </div>
    )
}
