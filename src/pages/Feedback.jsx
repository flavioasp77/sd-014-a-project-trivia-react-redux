import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Feedback.css';

const LOW_SCORE_MESSAGE = 'Podia ser melhor...';
const HIGH_SCORE_MESSAGE = 'Mandou bem!';
const HIGH_SCORE_THRESHOLD = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <main>
        <Header />

        <h1 className="feedback" data-testid="feedback-text">
          { assertions >= HIGH_SCORE_THRESHOLD ? HIGH_SCORE_MESSAGE : LOW_SCORE_MESSAGE }
        </h1>
        <h2 className="feedback">
          Você acertou&nbsp;
          <span data-testid="feedback-total-question">{ assertions }</span>
          &nbsp;quest
          { assertions >= 2 ? 'ões' : 'ão' }
          !
          <br />
          Um total de&nbsp;
          <span data-testid="feedback-total-score">{ score }</span>
          &nbsp;pontos.
        </h2>
        <a href="/">
          <button type="button" data-testid="btn-play-again" id="btn-play-again">
            JOGAR NOVAMENTE
          </button>
        </a>

        <Footer />
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
