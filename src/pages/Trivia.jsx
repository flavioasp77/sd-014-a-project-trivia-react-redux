import React from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import opentdbAPI from '../services/opentdbAPI';
import Loading from '../components/Loading';

const QUESTIONS_AMOUNT = 5;

export default class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      score: 0,
      loading: true,
    };

    this.handleAnswer = this.handleAnswer.bind(this);
  }

  async componentDidMount() {
    const response = await opentdbAPI.fetchQuestions(QUESTIONS_AMOUNT);
    this.loadQuestions(response.results);
  }

  loadQuestions(questions) {
    this.setState({ questions, loading: false });
  }

  handleAnswer(answer) {
    const { score } = this.state;
    if (answer) {
      this.setState({ score: score + 1 });
    }
  }

  render() {
    const { questions, loading } = this.state;
    if (loading) {
      return (<Loading />);
    }

    const question = questions.shift();
    return (
      <>
        <Header />
        <QuestionCard question={ question } callback={ this.handleAnswer } />
      </>
    );
  }
}
