import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage';
import Signup from './Components/Signup';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard';
import BoardPage from './Components/boardPage';
function App() {
  return (
    <div className="App">
     <Switch>
       <Redirect  path="/" exact to="/signup" />
      <Route path="/signup"  component={Signup}  />
      <Route path="/login" component={Login}  />
      <Route path='/boards' component={Dashboard}/>
      <Route path="/:id/dashboard" component={BoardPage} />
     </Switch>
    </div>
  );
}

export default App;
