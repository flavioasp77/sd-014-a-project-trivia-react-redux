import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Question from '../components/question';

class Game extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <main>
        <Header />
        { questions.map((question, index) => (
          <Question key={ index } questionCurrent={ question } />)) }
      </main>
    );
  }
}

Game.propTypes = {
  setApiTrivia: PropTypes.func,
  // questions: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  state,
});

export default connect(mapStateToProps)(Game);
