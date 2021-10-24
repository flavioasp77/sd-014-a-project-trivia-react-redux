import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Config from './pages/Config';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import Trivia from './pages/Trivia';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route path="/trivia" component={ Trivia } />
            <Route path="/feedback" component={ Feedback } />
            <Route path="/ranking" component={ Ranking } />
            <Route path="/config" component={ Config } />
            <Route exact path="/" component={ Login } />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
