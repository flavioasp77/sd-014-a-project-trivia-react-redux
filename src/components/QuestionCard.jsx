import React, { Component } from 'react';
import { fetchQuestions } from '../services';

export default class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      loading: true,
    };
    this.setQuestions = this.setQuestions.bind(this);
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

  renderButtons() {
    const { questions, questionNumber } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];
    const correctButton = (
      <button type="button" data-testid="correct-answer" key={ questionNumber }>
        { correctAnswer }
      </button>
    );
    const incorrectButtons = (
      incorrectAnswers.map((answers, index) => (
        <button type="button" data-testid={ `wrong-answer-${index}` } key={ index }>
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
      </section>
    );
  }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
