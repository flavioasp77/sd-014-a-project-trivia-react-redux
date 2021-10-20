import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Ranking from './pages/Ranking';
import Score from './pages/Score';
import Trivia from './pages/Trivia';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route path="/trivia" component={ Trivia } />
            <Route path="/score" component={ Score } />
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

export default App;
