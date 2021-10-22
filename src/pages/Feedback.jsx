import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { name, source } = this.props;
    const state = localStorage.getItem('state');
    const { player: { score, assertions } } = JSON.parse(state);
    const MIN_ANSWERS = 3;
    return (
      <div>
        <h1>Feedback</h1>
        <header>
          <h3 data-testid="header-player-name">{ name }</h3>
          <img
            data-testid="header-profile-picture"
            src={ source }
            alt="gravatar"
          />
          <p>
            Pontuação final:
            <span data-testid="header-score">
              { score }
            </span>
          </p>
        </header>
        <main>
          <p data-testid="feedback-text">
            {
              assertions < MIN_ANSWERS ? 'Podia ser melhor...' : 'Mandou bem!'
            }
          </p>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
  source: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  // score: state.player.score,
  source: state.player.source.url,
});

export default connect(mapStateToProps, null)(Feedback);
