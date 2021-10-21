import React from 'react';
import { Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
<<<<<<< HEAD
import GameScreen from './pages/GameScreen';
=======
import Game from './pages/Game';
>>>>>>> e12a519a4668985c8b45247782ed6a581ed5c77a

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header> */}
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
<<<<<<< HEAD
      <Route exact path="/game" component={ GameScreen } />
=======
      <Route path="/game" component={ Game } />
>>>>>>> e12a519a4668985c8b45247782ed6a581ed5c77a
    </div>
  );
}
