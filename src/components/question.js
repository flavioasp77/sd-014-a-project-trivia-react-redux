import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      green: '',
      red: '',
    };
    this.correctAnswer = this.correctAnswer.bind(this);
  }

  correctAnswer(verify, question) {
    return verify === question ? this.setState({
      green: '3px solid rgb(6, 240, 15)',
      red: '3px solid rgb(255, 0, 0)',
    }) : this.setState({ red: '3px solid rgb(255, 0, 0)',
      green: '3px solid rgb(6, 240, 15)' });
  }

  render() {
    const { green, red } = this.state;
    const { questionCurrent: { question, category }, questionCurrent,
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
              questionCurrent.correct_answer) }
            type="button"
            value={ questionCurrent.correct_answer }
            style={ { border: green } }
          >
            { questionCurrent.correct_answer }
          </button>
          {questionCurrent.incorrect_answers.map((wrong, index) => (
            <button
              value={ wrong }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              type="button"
              onClick={ () => this.correctAnswer(wrong, questionCurrent.correct_answer) }
              style={ { border: red } }
            >
              { wrong }
            </button>
          ))}
        </div>
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
