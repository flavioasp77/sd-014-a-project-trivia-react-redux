import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

import '../css/Feedback.css';

class Feedback extends React.Component {
  render() {
    const { getSource } = this.props;
    const state = localStorage.getItem('state');
    const { player: { name, score, assertions } } = JSON.parse(state);
    return (
      <main>
        <Header name={ name } score={ score } source={ getSource } />
        <div className="mainFeedback">
          <p className="text" data-testid="feedback-text">
            { assertions <= 2 ? 'Podia ser melhor...' : 'Mandou bem!'}
          </p>
          <p data-testid="feedback-total-score">
            Pontuação final:
            { score }
          </p>
          <p data-testid="feedback-total-question">
            Total de acertos:
            { assertions }
          </p>
        </div>
        <section className="links">
          <Link className="link" to="/" type="button" data-testid="btn-play-again">
            Jogar novamente
          </Link>
          <Link className="link" to="/ranking" type="button" data-testid="btn-ranking">
            Ver Ranking
          </Link>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  getSource: state.user.infoUser,
});

Feedback.propTypes = {
  getSource: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
