import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffleArray from '../services/shuffleArray';
import { fetchQuestionsAction } from '../redux/actions';
import '../styles/questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      question: '',
      answers: [],
      correct: '',
      highlight: false,
    };

    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
  }

  async handleQuestions() {
    const { fetchQuestionsToState } = this.props;
    const questions = await fetchQuestionsToState();

    const {
      category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrect,
    } = questions[0];

    this.setState({
      category,
      question,
      answers: shuffleArray([correct, ...incorrect]),
      correct,

    });
  }

  handleAnswer() {
    console.log('click');
    this.setState({
      highlight: true,
    });
  }

  render() {
    const { category, question, answers, correct, highlight } = this.state;
    const { loadingState } = this.props;

    if (loadingState) {
      return (
        <span>Loading...</span>
      );
    }

    return (
      <section>
        <span data-testid="question-category">
          { category }
        </span>
        <p data-testid="question-text">{ question }</p>
        {
          answers.map((answer, i) => {
            if (answer === correct) {
              return (
                <button
                  className={ highlight ? 'correct-answer' : 'default-answer' }
                  type="button"
                  key={ i }
                  onClick={ this.handleAnswer }
                  data-testid="correct-answer"
                >
                  { answer }
                </button>);
            }
            return (
              <button
                className={ highlight ? 'wrong-answer' : 'default-answer' }
                type="button"
                key={ i }
                onClick={ this.handleAnswer }
                data-testid={ `wrong-answer-${i}` }
              >
                { answer }
              </button>
            );
          })
        }
      </section>
    );
  }
}

Questions.propTypes = {
  fetchQuestionsToState: PropTypes.func.isRequired,
  loadingState: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  stateQuestions: state.player.questions,
  loadingState: state.player.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsToState: () => dispatch(fetchQuestionsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
