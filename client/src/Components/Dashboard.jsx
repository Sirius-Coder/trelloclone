import React,{useEffect,useState} from 'react'
import {useHistory,Link} from 'react-router-dom'
import axios from 'axios'
import {Grid,Toolbar,AppBar, IconButton, Paper,Tooltip, TextField, FormGroup, FormControlLabel,Checkbox,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ErrorPage from './ErrorPage'
import Loader from 'react-loader-spinner'
import Modal from 'react-modal'
Modal.setAppElement('#root')
//Material UI Styles 
const useStyles = makeStyles(theme=>({
    root:{
        boxSizing:'border-box',
        fontFamily:'Montserrat',
        [theme.breakpoints.down('sm')]: {
            fontSize:'0.8em'
    }
},
    viewArea:{
        padding:'1em'
    },
    loaderview:{
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    add:{
        height:'25vh',
        width:'15vw',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        [theme.breakpoints.down('sm')]: {
            width:"55vw",
            height:'20vh',
            margin:'0.1em auto'
           
    }
    },
    boardcard:{
        height:'25vh',
        width:'15vw',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'2em',
        margin:'1em 2em',
        background:'#006B8F',
        color:'white',
        letterSpacing:'0.1em',
        [theme.breakpoints.down('sm')]: {
            width:"55vw",
            height:'20vh',
            margin:'1em auto'
           
    }
    },
    modal:{
        height:'70vh',
        width:'50vw',
        margin:'5em auto',
        background:'#026aa7',
        outline:'none',
        borderRadius:'1em',
        color:'white',
        fontFamily:'Montserrat',
        padding:'0.5em 1.5em',
        [theme.breakpoints.down('sm')]: {
            width:"80vw",
            margin:'7.5em auto'
    }
    }
}))
export default function Dashboard() {
    const classes=useStyles()
    const history=useHistory()
    const [view,setView]=useState('load')
    const [user,setUser]=useState('User')
    const [userId,setUserId]=useState('')
    const [modal,setModal]=useState(false)
    const [members,setMembers]=useState([])
    const [boards,setBoards]=useState([])
    const [boardList,setBoardList]=useState([])
    const [boardTitle,setBoradTitle]=useState('')
    const [update,setUpdate]=useState(0)
    //On Component Mount Verify the User and get the members and Boards list
    useEffect(()=>{
       const func=async()=>{
        try{
           const response = await axios.get('/authenticate') 
           if(response.data.success===true)
           {
            setView('logged')
            setUser(response.data.name)
            setUserId(response.data.id)
            //Get all the members available
            const memberResponse=await axios.get(`/getMembers`)
            const boardResponse = await axios.get(`/getBoards/${response.data.id}`)
            setBoards(boardResponse.data.boards)
            setMembers(memberResponse.data.members)
            setBoardList([{name:response.data.name,email:response.data.email,id:response.data.id}])
           }
           else
           setView('fail')
        }
        catch(e)
        {console.error(e)}
       }
       func()
    },[update])
    
    //Logout the user
    const logout=async()=>{
        try{
            const response = await axios.get('/logout')
            if(response.data.success===true)
            history.push('/login')
        }
        catch(e)
        {console.error(e)}
    }
    //Set Board title
    const setboardtitle=(e)=>{
        setBoradTitle(e.target.value)
    }
    //Create a new Board
    const createBoard=async()=>{
        var res = await axios.post('/createBoard',{title:boardTitle,members:boardList})
        if(res.data.success===true)
        {
            setModal(false)
            setBoardList([])
            setBoradTitle('')
            setUpdate(update+1)
        }
    }
    //Open modal
    const openModal=()=>{
        setModal(true)
    }
    //Close Modal
    const closeModal=()=>{
        setModal(false)
    }
    if(view==='logged')
    return (
        <div className={classes.root}>
           
        <AppBar position="static" style={{backgroundColor:'#026aa7'}} >
        <Toolbar variant="dense">
          <Grid container alignItems='center'  >
            <Grid item xs={4}>
                <h2>{user}'s Boards</h2>
            </Grid>
            <Grid item xs={4} align='center' >
                <h2>Trello App</h2>
                </Grid>
                <Grid item xs={4} align='right' >
                    <Tooltip title="Logout">
                <IconButton style={{color:'white'}} onClick={logout} >
                    <ExitToAppIcon/>
                </IconButton></Tooltip>
                </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container alignItems='center' className={classes.viewArea} >
         <Paper elevation={10} className={classes.add}>
             <Tooltip title="Create New Board">
        <Grid item xs={2} align='center'  >
            <IconButton onClick={openModal} >
                <AddIcon />
            </IconButton>
        </Grid>
        </Tooltip>
        </Paper>
        
            {boards.map(para=>(<BoardCard key={para.id} title={para.title} id={para.id} />))}
       
      </Grid>
      {/* Create a Board Modal */}
        <Modal isOpen={modal}  style={{overlay:{background:'transparent'}}} className={classes.modal}   >
        <Grid container alignItems='center' spacing={1} >
            <Grid item xs={12} align='right' >
                <IconButton onClick={closeModal} style={{color:'white'}} >
                    <CloseIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={12} align='center' >
                <h2>Create a New Board</h2>
            </Grid>
            <Grid item xs={6} align='center' >
                <h3>Title</h3>
            </Grid>
            <Grid item xs={6}  >
                <TextField variant='outlined' size='small' style={{background:'white',color:'white',borderRadius:'0.5em'}} onChange={setboardtitle} />
            </Grid>
            <Grid item xs={6} align='center' >
                <h3>Select Members:</h3>
            </Grid>
            <Grid item xs={6} style={{maxHeight:'25vh',overflowY:'scroll'}} >
                <FormGroup>
                    {members.map(para=>(<Member key={para.id} name={para.name} email={para.email} id={para.id}  list={boardList} setList={setBoardList}  />))}
                </FormGroup>
            </Grid>
            <Grid item xs={12} align='center' >
                <Button variant="contained" style={{color:'white',padding:'0.5em',background:'#61bd4f',width:'40%',marginTop:'1em'}} onClick={createBoard} >
                    Submit
                </Button>
            </Grid>

        </Grid>
        </Modal>
        </div>
    )
    else if(view==='fail')
    return(
        <ErrorPage msg="You are not authenticated " />
    )
    else
    return(
        <div className={classes.loaderview} >
        <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs

     />
       </div>
    )
}


//Member component
const Member=({name,email,id,list,setList})=>{
    const [checked,setChecked]=useState(false)

    //OnChange
    const handleChange=(e)=>{
        setChecked(!checked)
        if(!checked===true)
        setList(list.concat([{name,email,id}]))
        else
        setList(list.filter(para=>para.id!==id))
    }
    return(
        <>
        <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange}  name={name} />}
        label={name}
         />
        </>
    )
}

//Board Card Component
const BoardCard = ({title,id})=>{
    const classes=useStyles()
    return(
        <Grid item xs={12} sm={2} align='center' className={classes.boardcard} >
           <Link to={`/${id}/dashboard`} style={{color:'white',textDecoration:'none'}} > <h1>{title}</h1> </Link>
        </Grid>
    )
}