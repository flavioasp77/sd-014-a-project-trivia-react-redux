import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getStatePlayer } from '../helpers/index';
import '../styles/feedback.css';

export class Feedback extends Component {
  render() {
    const { assertions, score } = getStatePlayer().player;
    const numFeedback = 3;
    const feedback = assertions >= numFeedback ? 'Mandou bem!' : 'Podia ser melhor...';
    const { history } = this.props;
    return (
      <>
        <Header />
        <main className="containner-main-feedback">
          <div className="card-feedback">
            <div className="card-text-contains">
              <h4 data-testid="feedback-text">{feedback}</h4>
            </div>
            <div className="card-text-contains">
              <h4>Score:</h4>
              <h4 data-testid="feedback-total-score">{score}</h4>
            </div>
            <div className="card-text-contains">
              <h4>successes:</h4>
              <h4 data-testid="feedback-total-question">{assertions}</h4>
            </div>
            <div className="containner-btn-feedback">
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ () => history.push('/') }
              >
                Jogar novamente
              </button>
              <button
                onClick={ () => history.push('/ranking') }
                type="button"
                data-testid="btn-ranking"
              >
                Ver Ranking
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Feedback;
