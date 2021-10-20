import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
    </BrowserRouter>
  );
}
