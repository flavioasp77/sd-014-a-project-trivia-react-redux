import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class FeedbackPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>

        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
      </div>
    );
  }
}
