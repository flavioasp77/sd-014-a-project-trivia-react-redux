import React from 'react';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import RequisitoCinco from './pages/Requisito5';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <RequisitoCinco />
      </header>
    </div>
  );
}

// <div className="App">
//      <header className="App-header">
//        <img src={ logo } className="App-logo" alt="logo" />
//        <p>
//          SUA VEZ
//        </p>
//      </header>
//    </div>
