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
          <section key={ index }>
            <p data-testid="question-category">{question.category}</p>
            <p data-testid="question-text">{question.question}</p>
            <button
              data-testid="correct-answer"
              type="button"
            >
              {question.correct_answer}

            </button>
            {question.incorrect_answers.map((incorrect, ind) => (
              <button
                data-testid={ `wrong-answer-${ind}` }
                type="button"
                key={ ind }
              >
                {incorrect}
              </button>))}
          </section>))}
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
