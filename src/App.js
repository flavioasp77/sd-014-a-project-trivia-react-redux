import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Jogo from './pages/Jogo';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header> */}
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/jogo"><Jogo /></Route>
        {/* <Route path="/settings"><Settings /></Route> */}
      </Switch>
    </div>
  );
}
