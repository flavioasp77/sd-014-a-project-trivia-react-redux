import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Settings from './pages/Settings';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Trivia } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}
export default App;
