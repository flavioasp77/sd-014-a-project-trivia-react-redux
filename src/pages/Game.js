import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Question from '../components/question';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { index } = this.state;
    const { questions } = this.props;
    if (index < (questions.length - 1)) { this.setState({ index: index + 1 }); }
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    return (
      <main>
        <Header />
        { console.log(this.props) }
        { questions && <Question key={ index } questionCurrent={ questions[index] } /> }
        <button type="button" onClick={ this.handleClick }>Próxima pergunta</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  state,
});

Game.propTypes = {
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Game);
