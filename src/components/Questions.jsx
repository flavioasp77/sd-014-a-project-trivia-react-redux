import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffleArray from '../services/shuffleArray';
import { fetchQuestionsAction } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      question: '',
      answers: [],
      correct: '',
      loading: true,
    };

    this.handleQuestions = this.handleQuestions.bind(this);
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
    }, () => this.setState({ loading: false }));
  }

  render() {
    const { category, question, answers, correct, loading } = this.state;

    if (loading) {
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
                  className="correct-answer"
                  type="button"
                  data-testid="correct-answer"
                  key={ i }
                >
                  { answer }
                </button>);
            }
            return (
              <button
                className="wrong-answer"
                type="button"
                data-testid={ `wrong-answer-${i}` }
                key={ i }
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
};

const mapStateToProps = (state) => ({
  stateQuestions: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsToState: () => dispatch(fetchQuestionsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
