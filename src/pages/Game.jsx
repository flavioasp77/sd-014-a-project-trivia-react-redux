import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.questionMapper = this.questionMapper.bind(this);
    this.questionClick = this.questionClick.bind(this);
    this.questionRenderer = this.questionRenderer.bind(this);

    this.state = {
      questionState: [
        false,
        true,
        true,
        true,
        true,
      ],
    };
  }

  questionClick({ target }) {
    const { questionState } = this.state;
    const questsStatus = questionState.map((quest, index) => {
      if (index === parseInt(target.name, 10) + 1) {
        return false;
      }
      quest = true;
      return quest;
    });
    this.setState({
      questionState: [...questsStatus],
    });
  }

  questionRenderer() {
    const { questionState } = this.state;
    const questionArray = this.questionMapper();
    const shouldRender = questionArray.map((elem, index) => {
      if (!questionState[index]) return elem;
      return null;
    });
    return shouldRender;
  }

  questionMapper() {
    const { questions } = this.props;
    const allQuestions = questions.map((question, index) => (
      <div key={ index }>
        <h1>
          <span data-testid="question-category">{question.category}</span>
        </h1>
        <h2>
          <span data-testid="question-text">{question.question}</span>
        </h2>
        <ul>
          <li>
            <button
              name={ index }
              data-testid="correct-answer"
              type="button"
              onClick={ this.questionClick }
            >
              { question.correct_answer }
            </button>
          </li>
          {question.incorrect_answers.map((incorrect, ind) => (
            <li key={ ind }>

              <button
                name={ index }
                data-testid={ `wrong-answer-${ind}` }
                type="button"
                onClick={ this.questionClick }
              >
                {incorrect}
              </button>
            </li>))}
        </ul>
      </div>));
    return allQuestions;
  }

  render() {
    return (
      <div>
        <Header />
        <this.questionRenderer />
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  loading: state.questions.loading,
});

export default connect(mapStateToProps)(Game);
