import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Config from './pages/Config';
import GameScreen from './pages/GameScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/game" component={ GameScreen } />
    </BrowserRouter>
  );
}
