import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      green: '',
      red: '',
      buttonNext: false,
    };
    this.correctAnswer = this.correctAnswer.bind(this);
    this.resultCorrect = this.resultCorrect.bind(this);
    this.numberDifficulty = this.numberDifficulty.bind(this);
    this.newScores = this.newScores.bind(this);
  }

  newScores(scoreCurrent) {
    const playerOld = JSON.parse(localStorage.getItem('player'));
    document.getElementById('score').innerHTML = (!playerOld ? 0
      : JSON.stringify(...Object.values(
        { score: playerOld.score + scoreCurrent },
      )));
  }

  resultCorrect(scoreCurrent) {
    const player = {
      name: '',
      assertions: '',
      score: scoreCurrent,
      gravatarEmail: '',
    };
    const playerStorage = JSON.parse(localStorage.getItem('player'));

    return ((!playerStorage ? localStorage.setItem('player', JSON.stringify(player))
      : (localStorage.setItem('player', JSON.stringify({
        ...playerStorage,
        ...{ score: playerStorage.score + scoreCurrent } }))),
    this.newScores(scoreCurrent)));
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
      buttonNext: true,
    });
    const ten = 10;
    const scoreCurrent = ten + (this.numberDifficulty(difficulty, timer));
    return (verify === question && this.resultCorrect(scoreCurrent));
  }

  render() {
    const { green, red, buttonNext: end } = this.state;
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
        { end && <button type="button" onClick={ buttonNext }>Próxima pergunta</button>}
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
