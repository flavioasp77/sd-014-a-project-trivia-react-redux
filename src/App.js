import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';
import MainPage from './pages/MainPage';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Config } />
        <Route exact path="/game" component={ MainPage } />
      </Switch>
    );
  }
}

export default App;
