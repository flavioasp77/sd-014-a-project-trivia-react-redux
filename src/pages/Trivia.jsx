import React from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import opentdbAPI from '../services/opentdbAPI';
import Loading from '../components/Loading';
import storage from '../services/storage';

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
    this.setState({ score: score + (answer ? 1 : 0) }, () => {
      const state = {
        player: {
          score,
          assertions,
        },
      };
      storage.write('state', state);
    });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    const { questions, loading } = this.state;
    if (loading) {
      return (<Loading />);
    }

    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions.shift();
    const options = this.shuffle([correctAnswer, ...incorrectAnswers]);

    return (
      <>
        <Header />
        <QuestionCard
          data={
            { category, question, correctAnswer, incorrectAnswers, options, difficulty }
          }
          callback={ this.handleAnswer }
        />
      </>
    );
  }
}
