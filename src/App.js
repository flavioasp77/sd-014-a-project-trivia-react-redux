import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './Pages/Game';
import Ranking from './Pages/Ranking';
import Feedback from './Pages/Feedback';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/game"
          render={ (props) => <Game { ...props } /> }
        />
        <Route
          exact
          path="/feedback"
          render={ (props) => <Feedback { ...props } /> }
        />
        <Route
          exact
          path="/ranking"
          render={ (props) => <Ranking { ...props } /> }
        />
        <Route
          exact
          path="/settings"
          render={ (props) => <Settings { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}
