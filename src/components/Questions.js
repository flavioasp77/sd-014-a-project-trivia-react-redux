import React from 'react';
import { requestQuestion } from '../services/tokenAPI';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      loading: true,
    };

    this.getQuestionsFromAPI = this.getQuestionsFromAPI.bind(this);
    this.getSortedButtons = this.getSortedButtons.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromAPI();
  }

  async getQuestionsFromAPI() {
    this.setState({ loading: true });
    const token = localStorage.getItem('token');

    const questions = await requestQuestion(token);
    this.setState({ questions, loading: false });
  }

  getSortedButtons() {
    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    const buttons = [
      <button
        key={ currentQuestion.correct_answer }
        type="button"
        data-testid="correct-answer"
      >
        {currentQuestion.correct_answer}
      </button>,
      currentQuestion.incorrect_answers.map((answer, ind) => (
        <button key={ answer } type="button" data-testid={ `wrong-answer-${ind}` }>
          {answer}
        </button>
      )),
    ];

    const fator = 0.5;
    const sortedButtons = buttons.sort(() => Math.random() - fator);
    return sortedButtons;
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <span>Loading...</span>;
    }

    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div>
        <section>
          <h2 data-testid="question-category">{currentQuestion.category}</h2>
          <p data-testid="question-text">{currentQuestion.question}</p>
        </section>
        <section className="answere">
          {this.getSortedButtons()}
          <br />
          <button type="button">PRÓXIMA</button>
        </section>
      </div>
    );
  }
}

export default Questions;
