import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import triviaLogo from '../trivia.png';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { questionsInfoThunk } from '../actions';
import './game.css';

class Game extends Component {
  componentDidMount() {
    const { questionInfo } = this.props;
    questionInfo();
  }

  render() {
    return (
      <div>
        <Header />
        <img className="trivia-logo" src={ triviaLogo } alt="Logo do App Trivia" />
        <Questions />
      </div>
    );
  }
}

Game.propTypes = {
  questionInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  questionInfo: () => dispatch(questionsInfoThunk()),
});

export default connect(null, mapDispatchToProps)(Game);
