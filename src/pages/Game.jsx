import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestion } from '../redux/actions';
import { savePlayerOnRankingLocalStorage } from '../services/localStorage';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
    };
    this.createAnswers = this.createAnswers.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
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

  createAnswers(question) {
    // Precisamos de um disabled global para ser modificado do componente TimeOut
    const wrongAnswers = question.incorrect_answers.map((answer, index) => ({
      testId: `wrong-answer-${index}`,
      className: 'wrong',
      text: answer }
    ));
    const correctAnswer = {
      testId: 'correct-answer',
      className: 'correct',
      text: question.correct_answer,
    };
    const answers = [...wrongAnswers, correctAnswer];
    return this.shuffle(answers);
  }

  nextQuestion() {
    const FOURTH = 4;
    const { history } = this.props;
    const { question } = this.state;
    if (question < FOURTH) {
      this.setState({ question: question + 1 });
    } else {
      savePlayerOnRankingLocalStorage();
      history.push('/feedback');
    }
  }

  createQuestions() {
    const { questions } = this.props;
    return questions.map((question, index) => (
      <Question
        key={ index }
        question={ question }
        answers={ this.createAnswers(question) }
        nextQuestion={ this.nextQuestion }
      />
    ));
  }

  render() {
    const { isLoaded } = this.props;
    const { question } = this.state;
    const questionsList = this.createQuestions();
    return (
      <>
        <Header />
        {isLoaded && questionsList[question]}
      </>
    );
  }
}

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isLoaded: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestion()),
});

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  isLoaded: state.question.isLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
