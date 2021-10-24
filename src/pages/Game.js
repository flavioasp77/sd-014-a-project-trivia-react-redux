import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Question from '../components/question';
import Header from '../components/Header';

const ONE_SECOND = 1000;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      timer: 30,
    };

    this.handleClick = this.handleClick.bind(this);
    this.timerRunning = this.timerRunning.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.timerRunning(), ONE_SECOND);
  }

  timerRunning() {
    this.setState((prevState) => (
      { timer: prevState.timer === 0 ? prevState.timer : prevState.timer - 1 }));
  }

  handleClick() {
    const { index } = this.state;
    const { questions } = this.props;
    if (index < (questions.length - 1)) {
      this.setState({
        index: index + 1, timer: 30 });
    }
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    const { timer } = this.state;
    return (
      <main>
        <Header />
        <p>{`${timer} segundos restantes`}</p>
        { questions && <Question
          key={ index }
          questionCurrent={ questions[index] }
          timer={ timer }
          buttonNext={ this.handleClick }
        /> }
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
