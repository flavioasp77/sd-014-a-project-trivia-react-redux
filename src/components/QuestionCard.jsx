import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services';
import CountdownTimer from './CountdownTimer';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      loading: true,
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.switchColors = this.switchColors.bind(this);
    this.handdleClick = this.handdleClick.bind(this);
  }

  componentDidMount() {
    this.setQuestions();
  }

  async setQuestions() {
    const token = localStorage.getItem('token');
    const questions = await fetchQuestions(token);
    this.setState({
      questions,
      loading: false,
    });
  }

  shuffleButtons(buttons) {
    for (let i = buttons.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }
  }

  handdleClick() {
    this.switchColors();
  }

  switchColors() {
    const correctButton = document.querySelector('.correctButton');
    const incorrectButtons = document.querySelectorAll('.incorrectButtons');

    correctButton.style.border = '3px solid rgb(6, 240, 15)';
    incorrectButtons.forEach((element) => {
      element.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  renderButtons() {
    const { questions, questionNumber } = this.state;
    const { disable } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];
    const correctButton = (
      <button
        className="correctButton"
        type="button"
        data-testid="correct-answer"
        key={ questionNumber }
        onClick={ this.switchColors }
        disabled={ disable }
      >
        { correctAnswer }
      </button>
    );
    const incorrectButtons = (
      incorrectAnswers.map((answers, index) => (
        <button
          className="incorrectButtons"
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          onClick={ this.switchColors }
          disabled={ disable }
        >
          { answers }
        </button>
      ))
    );
    const answersButtons = [correctButton, ...incorrectButtons];
    this.shuffleButtons(answersButtons);
    return answersButtons;
  }

  render() {
    const { questions, questionNumber, loading } = this.state;
    if (loading) return <h1>Loading...</h1>;
    return (
      <section>
        <h1 data-testid="question-category">{ questions[questionNumber].category }</h1>
        <h3 data-testid="question-text">{ questions[questionNumber].question }</h3>
        { this.renderButtons() }
        <CountdownTimer />
      </section>
    );
  }
}

QuestionCard.propTypes = {
  disable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  disable: state.game.disableButton,
});

export default connect(mapStateToProps)(QuestionCard);

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
