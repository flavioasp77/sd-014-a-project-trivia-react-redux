// teste
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    let message = '';
    const NUMBERTHREE = 3;

    if (assertions < NUMBERTHREE) {
      message = 'Podia ser melhor...';
    } else {
      message = 'Mandou bem!';
    }

    return (
      <div>
        <Header />
        <h3>Resultados</h3>
        <p data-testid="feedback-text">{message}</p>
        <p>
          Score total:
          { ' ' }
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          Acertou:
          { ' ' }
          <span data-testid="feedback-total-question">{ assertions }</span>
          { ' ' }
          Pergunta(s)!
        </p>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    assertions: state.userReducer.assertions,
    score: state.userReducer.score,
  };
}

export default connect(mapStateToProps, null)(Feedback);
