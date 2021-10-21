import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.createAnswers = this.createAnswers.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  handleClick() {
    document.querySelectorAll('.wrong').forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
    });
    document.querySelector('.correct').style.border = '3px solid rgb(6, 240, 15)';
  }

  createAnswers() {
    // Precisamos de um disabled global para ser modificado do componente TimeOut
    const { question } = this.props;
    const wrongAnswers = question.incorrect_answers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        className="wrong"
        onClick={ this.handleClick }
        disabled="false"
      >
        { answer }
      </button>));
    const correctAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        className="correct"
        onClick={ this.handleClick }
        disabled="false"
      >
        {question.correct_answer}
      </button>);
    const answers = [...wrongAnswers, correctAnswer];
    return this.shuffle(answers);
  }

  render() {
    const { question } = this.props;
    return (
      <section>
        <div>
          <p
            data-testid="question-category"
          >
            { question.category }
          </p>
          <p
            data-testid="question-text"
          >
            { question.question }
          </p>
        </div>
        <div>
          <ul>
            { this.createAnswers().map((answer, index) => (
              <li key={ index }>
                { answer }
              </li>
            )) }
          </ul>
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.shape({
      map: PropTypes.func,
    }),
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
