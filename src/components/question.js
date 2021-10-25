import React from 'react';
import PropTypes from 'prop-types';
import ButtonNext from './ButtonNext';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      green: '',
      red: '',
      end: false,
      // scoreState: 0,
    };
    this.correctAnswer = this.correctAnswer.bind(this);
    this.resultCorrect = this.resultCorrect.bind(this);
    this.numberDifficulty = this.numberDifficulty.bind(this);
    this.newScores = this.newScores.bind(this);
  }

  newScores(stateStorage, scoreCurrent) {
    console.log(scoreCurrent, 'scoreCurrent');
    console.log(stateStorage, 'stateStorage');
    document.getElementById('score').innerHTML = (!stateStorage ? scoreCurrent
      : (stateStorage.player.score + scoreCurrent));
  }

  resultCorrect(scoreCurrent) {
    const state = {
      player: {
        name: '',
        assertions: '',
        score: scoreCurrent,
        gravatarEmail: '',
      },
    };
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    return ((!stateStorage ? localStorage.setItem('state', JSON.stringify(state))
      : (localStorage.setItem('state', JSON.stringify({
        ...stateStorage,
        player: { ...stateStorage.player,
          score: stateStorage.player.score + scoreCurrent } }))),
    this.newScores(stateStorage, scoreCurrent)));
  }

  numberDifficulty(difficulty, timer) {
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (difficulty) {
    case 'hard':
      return hard * timer;
    case 'medium':
      return medium * timer;
    case 'easy':
      return easy * timer;
    default:
      return 0;
    }
  }

  correctAnswer(verify, question, difficulty, timer) {
    this.setState({
      green: '3px solid rgb(6, 240, 15)',
      red: '3px solid rgb(255, 0, 0)',
      end: true,
    });
    const ten = 10;
    const scoreCurrent = ten + (this.numberDifficulty(difficulty, timer));
    return (verify === question && this.resultCorrect(scoreCurrent));
  }

  render() {
    const { green, red, end } = this.state;
    const { questionCurrent:
      { question, category, difficulty }, questionCurrent, timer, buttonNext,
    } = this.props;
    return (
      <section>
        <div>
          <h4 data-testid="question-category">{ category }</h4>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div>
          <button
            data-testid="correct-answer"
            onClick={ () => this.correctAnswer(questionCurrent.correct_answer,
              questionCurrent.correct_answer, difficulty, timer) }
            type="button"
            value={ questionCurrent.correct_answer }
            style={ { border: green } }
            disabled={ timer === 0 }
          >
            { questionCurrent.correct_answer }
          </button>
          {questionCurrent.incorrect_answers.map((wrong, index) => (
            <button
              value={ wrong }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              type="button"
              onClick={ () => this.correctAnswer(
                wrong, questionCurrent.correct_answer, difficulty, timer,
              ) }
              style={ { border: red } }
              disabled={ timer === 0 }
            >
              { wrong }
            </button>
          ))}
        </div>
        { end && <ButtonNext onClick={ buttonNext } /> }
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string,
  category: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  correct_answer: PropTypes.string,
}.isRequired;

export default Question;
