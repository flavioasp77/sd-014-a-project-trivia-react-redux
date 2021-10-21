import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import TimeOut from '../components/TimeOut';
import { fetchQuestion } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    const { questions, isLoaded } = this.props;
    return (
      <>
        <Header />
        {isLoaded && <Question question={ questions[0] } />}
        <TimeOut />
      </>
    );
  }
}

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  isLoaded: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestion()),
});

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  isLoaded: state.question.isLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
