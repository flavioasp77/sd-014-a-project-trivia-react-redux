import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Question from '../components/question';

class Game extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <main>
        { questions.map((question, index) => (
          <Question key={ index } questionCurrent={ question } />)) }
      </main>
    );
  }
}

Game.propTypes = {
  setApiTrivia: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
});

export default connect(mapStateToProps)(Game);
