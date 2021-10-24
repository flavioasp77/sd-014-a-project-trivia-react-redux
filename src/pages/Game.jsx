import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
