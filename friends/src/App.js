import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import RouterGuard from './components/RouteGuard';

// Import Views
import LogIn from './views/Login';
import Home from './views/Home';
function App() {
  return (
    <div className="App">
      <Switch>
      <RouterGuard exact path="/" component={Home}/>
      <Route path="/login" component={LogIn}/>

      </Switch>
    </div>
  );
}

export default App;
