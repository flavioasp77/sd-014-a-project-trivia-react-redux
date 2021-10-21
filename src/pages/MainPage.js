import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questAPI } from '../actions';
import Header from '../components/Header';

class MainPage extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <main>
        <Header />
        {questions.map((question, index) => (
          <div key={ index }>
            <p>
              Category:
              <span data-testid="question-category">{question.category}</span>
            </p>
            <p>
              Question:
              <span data-testid="question-text">{question.question}</span>
            </p>
            <ul>
              <li>
                <button
                  data-testid="correct-answer"
                  type="button"
                >
                  { question.correct_answer }
                </button>
              </li>
              {question.incorrect_answers.map((incorrect, ind) => (
                <li key={ ind }>

                  <button
                    data-testid={ `wrong-answer-${ind}` }
                    type="button"
                  >
                    {incorrect}
                  </button>
                </li>))}
            </ul>
          </div>))}
      </main>
    );
  }
}

MainPage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => (
  {
    getQuestions: () => dispatch(questAPI()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
