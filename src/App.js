import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';
import MainPage from './pages/MainPage';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Config } />
        <Route exact path="/game" component={ MainPage } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
