import React,{useEffect,useState,useRef} from 'react'
import {Grid,IconButton,AppBar,Toolbar,Tooltip,TextField,FormGroup,FormControlLabel,Button,Checkbox, Menu,MenuItem,Divider,Accordion,AccordionDetails,AccordionSummary,Dialog,DialogTitle} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useParams,useHistory} from 'react-router-dom';
import axios from 'axios'
import ErrorPage from './ErrorPage';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import { v4 as uuidv4 } from 'uuid'
import Loader from 'react-loader-spinner'
import Modal from 'react-modal'
Modal.setAppElement('#root')
//Material UI Styles 
const useStyles = makeStyles(theme=>({
    root:{
        boxSizing:'border-box',
        fontFamily:'Montserrat',
        [theme.breakpoints.down('sm')]: {
            fontSize:'0.65em'
    }
    },
    loaderview:{
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    list:{
        margin:'0.3em 0.5em ',
        background:'#EBE9EC'
    },
    addModal:{
        height:'60vh',
        width:'40vw',
        margin:'7em auto',
        outline:'none',
        background:'#026aa7',
        borderRadius:'1em',
        color:'white',
        fontFamily:'Montserrat',
        padding:'0.25em',
        [theme.breakpoints.down('sm')]: {
            width:"60vw",
            margin:'7.5em auto'
    }
    },
    taskmodal:{
        height:'30vh',
        width:'30vw',
        margin:'7em auto',
        outline:'none',
        background:'#026aa7',
        borderRadius:'1em',
        color:'white',
        fontFamily:'Montserrat',
        padding:'0.25em',
        [theme.breakpoints.down('sm')]: {
            width:"60vw",
            margin:'7.5em auto'
    }
    }
}))
export default function BoardPage() {
    const {id} = useParams()
    const classes = useStyles()
    const history =useHistory()
    const isFirstRun = useRef(true);
    const [anchorEl, setAnchorEl] = useState(null)
    const [view , setView] = useState('load')
    const [title,setTitle] = useState('')
    const [members,setMembers] = useState([])
    const [allMembers,setAllMembers]=useState([])
    const [memberArray,setMemberArray]=useState([])
    const [todo,setTodo] = useState([])
    const [development,setDevelopment]=useState([])
    const [reviewed ,setReviewed] = useState([])
    const [finished,setFinished] = useState([])
    const [addModal , setAddModal] = useState(false)
    const [update,setUpdate]=useState(0)
    const [update2,setUpdate2]=useState(0)
    const [addDialog, setAddDialog] = useState(false);
    const [delDialog, setDelDialog] = useState(false)
    //Task variables
    const [taskType,setTaskType] = useState('')
    const [taskTitle,setTaskTitle] = useState('')
    const [taskDesc,setTaskDesc] = useState('')
    const [taskMember,setTaskMember] = useState([])
    //On Component Mount Authenticate the user and get board data
    useEffect(()=>{
        const func =async()=>{
            try{
                const response = await axios.get(`/boardPage/${id}`)
                if(response.data.success===true)
                {
                    setView('logged')
                    setTitle(response.data.board.title)
                    setMembers(response.data.board.members)
                    setTodo(response.data.board.todo)
                    setDevelopment(response.data.board.development)
                    setReviewed(response.data.board.reviewed)
                    setFinished(response.data.board.finished)
                    const memresp = await axios.get('/getMembers')
                    setAllMembers(memresp.data.members)
                }
                else
                setView('fail')
            }
            catch(e)
            {console.error(e)}
        }
        func()
    },[update])

    //Back to user's Boards
    const backtoboards=(e)=>{
        history.push('/boards')
    }
    //Open Modal for Todo Task
    const openModalTodo=()=>{
        setAddModal(true)
        setTaskType('todo')
    }
    //Open Modal for Dev Task
    const openModalDev=()=>{
        setAddModal(true)
        setTaskType('dev')
    }
    //Open Modal for Review Task
    const openModalReview=()=>{
        setAddModal(true)
        setTaskType('review')
    }
    //Open Modal for Finished Task
    const openModalFin=()=>{
        setAddModal(true)
        setTaskType('fin')
    }
    //Close the add task modal
    const closeModal=()=>{
        setAddModal(false)
        setTaskType('')
        setTaskTitle('')
        setTaskDesc('')
        setTaskMember([])
    }
    //Updating the Board list's
    useEffect(()=>{
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
          }
        const func=async()=>{
            const response = await axios.post(`/updateBoard/${id}`,{todo,development,reviewed,finished})
        if(response.data.success===true)
        {
        setAddModal(false)
        setTaskType('')
        setTaskTitle('')
        setTaskDesc('')
        setTaskMember([])
        setUpdate(update+1)
        }
        }
        func()
    },[update2])
    //Submit Task
    const submitTask=(e)=>{
        
        switch(taskType)
        {
            case 'todo':
                setTodo(todo.concat([{title:taskTitle,desc:taskDesc,assigned:taskMember,id:uuidv4()}]))
                setUpdate2(update2+1)
                break;
            case 'dev' :
                setDevelopment(development.concat([{title:taskTitle,desc:taskDesc,assigned:taskMember,id:uuidv4()}]))
                setUpdate2(update2+1)
                break;
            case 'review'  :
                setReviewed(reviewed.concat([{title:taskTitle,desc:taskDesc,assigned:taskMember,id:uuidv4()}]))
                setUpdate2(update2+1)
                break;
            case 'fin' :
                setFinished(finished.concat([{title:taskTitle,desc:taskDesc,assigned:taskMember,id:uuidv4()}]))
                setUpdate2(update2+1)
                default: 
        }
        

    }
    //Change Task list
    const changeTask=(from,to,id,title,desc,members)=>{
        console.log(from , to ,id)
        switch(from)
        {
            case 'Todo' : setTodo(todo.filter(para=>para.id!==id))
                            break;
             case 'Development' : setDevelopment(development.filter(para=>para.id!==id))
                            break;
             case 'Review' : setReviewed(reviewed.filter(para=>para.id!==id))
                            break; 
            case 'Finished' : setFinished(finished.filter(para=>para.id!==id))
                            break; 
            default   :            
        }
        switch(to)
        {
            case 'Todo' : setTodo(todo.concat([{title,desc,assigned:members,id}]))
            setUpdate2(update2+1)
                            break;
             case 'Development' : setDevelopment(development.concat([{title,desc,assigned:members,id}]))
             setUpdate2(update2+1)
                            break;
             case 'Review' : setReviewed(reviewed.concat([{title,desc,assigned:members,id}]))
             setUpdate2(update2+1)
                            break; 
            case 'Finished' : setFinished(finished.concat([{title,desc,assigned:members,id}]))
            setUpdate2(update2+1)
                            break; 
            default   :            
        }
    }
    //Update members
    const addMembers=()=>{
       axios.post(`/addMember/${id}`,{memberArray:memberArray.concat(members)}).then(res=>{
           if(res.data.success===true)
           {
            setUpdate(update+1)
            setAddDialog(false)
            setMemberArray([])
           }
        }).catch(e=>console.error(e))
    }
    const deleteMembers = ()=>{
        axios.post(`/addMember/${id}`,{memberArray:members.filter(a=>!memberArray.some(b=>b.id===a.id))}).then(res=>{
            if(res.data.success===true)
            {
             setUpdate(update+1)
             setDelDialog(false)
             setMemberArray([])
            }
         }).catch(e=>console.error(e))
    }
   
   
    if(view==='logged')
    return (
        <div className={classes.root} >
           <AppBar position="static" style={{backgroundColor:'#026aa7'}} >
        <Toolbar variant="dense">
          <Grid container alignItems='center'  >
            <Grid item xs={4}>
                <h2>{title}</h2>
            </Grid>
            <Grid item xs={4} align='center' >
                <h2>Trello App</h2>
                </Grid>
                
                <Grid item xs={1} >
                <Tooltip title='Add/Delete Members'>
               <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)} style={{color:'white'}} >
                    <PersonIcon/>
               </IconButton>
               </Tooltip>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e)=>setAnchorEl(null)}
      >
        <MenuItem onClick={()=>setAddDialog(true)} >Add Member</MenuItem>
        <MenuItem onClick={()=>setDelDialog(true)}>Delete Member</MenuItem>
      </Menu>
                </Grid>
               
                <Grid item xs={3} align='right' >
                    <Tooltip title="Back to boards">
                <IconButton style={{color:'white'}} onClick={backtoboards} >
                    <HomeIcon/>
                </IconButton></Tooltip>
                </Grid>
          </Grid>
          {/* Add Member Dialog */}
          <Dialog
        open={addDialog}
        onClose={()=>setAddDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle  id="alert-dialog-title">Add Members</DialogTitle>
        <FormGroup style={{padding:"0.5em 2em"}} >
                    {allMembers.filter(a=>!members.some(b=>a.id===b.id)).map(para=>(<Member key={para.id} name={para.name} email={para.email} id={para.id} list={memberArray} setList={setMemberArray}   />))}
                </FormGroup>
            <Button variant='outlined' color='primary' onClick={addMembers} >
                Save Changes
            </Button>
      </Dialog>
        {/* Delete Member Dialog */}
        <Dialog
        open={delDialog}
        onClose={()=>setDelDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle  id="alert-dialog-title">Delete Members</DialogTitle>
        <FormGroup style={{padding:"0.5em 2em"}} >
                    {members.map(para=>(<Member key={para.id} name={para.name} email={para.email} id={para.id} list={memberArray} setList={setMemberArray}   />))}
                </FormGroup>
            <Button variant='outlined' color='primary' onClick={deleteMembers} >
                Save Changes
            </Button>
      </Dialog>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="center" className={classes.viewArea}>
        <Grid container xs className={classes.list} >
            <Grid item xs={12} align='center'  >
            <h3>To Do </h3>
            </Grid>
            <Grid item xs={12} align='center' >
                <IconButton onClick={openModalTodo}  >
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Divider/>
            {todo.map(para=>(<TaskItem key={para.id} title={para.title} desc={para.desc} members={para.assigned} type={'Todo'} id={para.id} changeTask={changeTask} />))}
        </Grid>
        <Grid item xs className={classes.list} >
        <Grid item xs={12} align='center'  >
            <h3>In development </h3>
            </Grid>
            <Grid item xs={12} align='center' >
                <IconButton onClick={openModalDev}  >
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Divider/>
            {development.map(para=>(<TaskItem key={para.id} title={para.title} desc={para.desc} members={para.assigned} id={para.id} type={'Development'} changeTask={changeTask} />))}
        </Grid>
        <Grid item xs className={classes.list} >
        <Grid item xs={12} align='center'  >
            <h3>To be reviewed </h3>
            </Grid>
            <Grid item xs={12} align='center' >
                <IconButton onClick={openModalReview}  >
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Divider/>
            {reviewed.map(para=>(<TaskItem key={para.id} title={para.title} desc={para.desc} members={para.assigned} type={'Review'} id={para.id} changeTask={changeTask} />))}
        </Grid>
        <Grid item xs className={classes.list} >
        <Grid item xs={12} align='center'  >
            <h3>Finished </h3>
            </Grid>
            <Grid item xs={12} align='center' >
                <IconButton onClick={openModalFin}  >
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Divider/>
            {finished.map(para=>(<TaskItem key={para.title} title={para.title} desc={para.desc} members={para.assigned} type={'Finished'} id={para.id} changeTask={changeTask} />))}
        </Grid>
      </Grid>
      <Modal isOpen={addModal} style={{overlay:{background:'none'}}} className={classes.addModal} >
        <Grid container alignItems='center'>
            <Grid item xs={12} align='right'>
                <IconButton onClick={closeModal} style={{color:'white'}}  >
                    <CloseIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12} align='center' >
                <h2>Create a Task</h2>
            </Grid>
            <Grid item xs={6} align='center' >
                <h3>Title</h3>
            </Grid>
            <Grid item xs={6}  >
                <TextField variant='outlined' size='small' style={{background:'white',color:'white',borderRadius:'0.5em'}} onChange={e=>setTaskTitle(e.target.value)}  />
            </Grid>
            <Grid item xs={6} align='center' >
                <h3>Description</h3>
            </Grid>
            <Grid item xs={6}  >
                <TextField variant='outlined' size='small' style={{background:'white',color:'white',borderRadius:'0.5em'}} onChange={e=>setTaskDesc(e.target.value)}  />
            </Grid>
            <Grid item xs={6} align='center' >
                <h3>Assign To:</h3>
            </Grid>
            <Grid item xs={6} style={{maxHeight:'25vh',overflowY:'scroll'}} >
                <FormGroup>
                    {members.map(para=>(<Member key={para.id} name={para.name} email={para.email} id={para.id} list={taskMember} setList={setTaskMember}   />))}
                </FormGroup>
            </Grid>
            <Grid item xs={12} align='center' >
                <Button variant="contained" style={{color:'white',padding:'0.5em',background:'#61bd4f',width:'40%',marginTop:'1em'}} onClick={submitTask} >
                    Submit
                </Button>
            </Grid>
        </Grid>
      </Modal>
        </div>
    )
    else if(view==='load')
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
    else
    return (
        <>
        <ErrorPage msg="You are not member of this board" />
        </>
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

//Taskitem component
const TaskItem=({title,desc,members,id,type,changeTask})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const arr=['Todo','Development','Review','Finished']
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
   
    return(
        <Grid item xs={12} align='center' 
         >
           <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{title}</h3>
          <IconButton onClick={handleClick} >
            <MoreVertIcon/>
          </IconButton>
          <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {arr.filter(para=>para!==type).map(para=>(<h5 style={{padding:'0.2em',fontFamily:'Montserrat',cursor:'pointer'}} onClick={(e)=>{changeTask(type,para,id,title,desc,members)}} >Move to {para}</h5>))}
      </Menu>
        </AccordionSummary>
        <AccordionDetails style={{display:desc===''?'none':'inline'}} >
          <h5>{desc}</h5>
        </AccordionDetails>
        <AccordionDetails>
         <h4>Assigned To :</h4>{members.map(para=>(<h5 style={{paddingRight:'0.3em'}}>{para.name}</h5>))}
        </AccordionDetails>
      </Accordion>
        </Grid>
    )
}