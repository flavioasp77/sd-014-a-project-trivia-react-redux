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
      questionBtnClicked: false,
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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

  handleClick() {
    this.setState({
      questionBtnClicked: true,
    });

    const correctButton = document.querySelector('.correctButton');
    const incorrectButtons = document.querySelectorAll('.incorrectButtons');

    correctButton.style.border = '3px solid rgb(6, 240, 15)';
    incorrectButtons.forEach((element) => {
      element.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  nextQuestion() {
    const correctButton = document.querySelector('.correctButton');
    const incorrectButtons = document.querySelectorAll('.incorrectButtons');

    correctButton.style.border = '1px solid';
    correctButton.style.borderRadius = '2px';
    incorrectButtons.forEach((element) => {
      element.style.border = '1px solid';
      element.style.borderRadius = '2px';
    });

    this.setState((prevState) => ({
      questionBtnClicked: false,
      questionNumber: prevState.questionNumber + 1,
    }));
  }

  buttonsArray() {
    const { questions, questionNumber } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];
    const answersButtons = [correctAnswer, ...incorrectAnswers];
    const shuffleButtons = answersButtons.sort();
    return shuffleButtons;
  }

  renderButtons() {
    const { questions, questionNumber, questionBtnClicked } = this.state;
    const { disable } = this.props;
    const buttons = questions.length > 0 && (
      this.buttonsArray().map((answers, index) => (
        <button
          data-testid={ answers === questions[questionNumber].correct_answer
            ? 'correct-answer' : `wrong-answer-${index}` }
          type="button"
          key={ index }
          className={ answers === questions[questionNumber].correct_answer
            ? 'correctButton' : 'incorrectButtons' }
          disabled={ questionBtnClicked || disable }
          onClick={ this.handleClick }
        >
          {answers}
        </button>
      ))
    );
    return buttons;
  }

  render() {
    const { questions, questionNumber, loading, questionBtnClicked } = this.state;
    if (loading) return <h1>Loading...</h1>;
    return (
      <section>
        <div>
          <h1
            data-testid="question-category"
          >
            { questions[questionNumber].category }
          </h1>
          <h3 data-testid="question-text">{ questions[questionNumber].question }</h3>
          { this.renderButtons() }
        </div>
        <CountdownTimer />
        { questionBtnClicked && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>
        )}
      </section>
    );
  }
}

QuestionCard.propTypes = {
  disable: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  disable: state.game.disableButton,
});

export default connect(mapStateToProps)(QuestionCard);
