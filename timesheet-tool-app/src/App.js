import './App.css';
import React from 'react';
import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Summary from './components/summary/Summary';
import Profile from './components/profile/Profile';
//import TimeSheet from './components/timesheet/TimeSheet';
import TimeSheet from './components/TimeSheet';
import Login from './components/login';
import { createBrowserHistory } from 'history';


const DefaultContainer = () => (
  <div>
    <Navigation/>
    <BrowserRouter>
    <Switch>
    <Route path="/summary" component={Summary} />
    <Route path="/timeSheet" component={TimeSheet} />
    <Route path="/profile" component={Profile} />
    </Switch>
    </BrowserRouter>

  </div>
)

function App(){
    return (
      <div>
        {/* <Navigation/>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/summary" component={Summary} />
            <Route path="/timeSheet" component={TimeSheet} />
            <Route path="/profile" component={Profile} />
            <Redirect from="/" to="summary" exact component={Summary} />
          </Switch>
        </BrowserRouter> */}
        <BrowserRouter>
          <Switch>
          <Redirect from="/" to="login" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route component={DefaultContainer}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
}
export default App;
