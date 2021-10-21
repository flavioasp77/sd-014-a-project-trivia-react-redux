import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Jogo extends Component {
  constructor() {
    super();
    this.handleQuestions = this.handleQuestions.bind(this);
    this.answerButtons = this.answerButtons.bind(this);
    this.ArrayRandomAnswers = this.ArrayRandomAnswers.bind(this);
  }

  answerButtons(questions, index) {
    const answers = this.ArrayRandomAnswers(questions, index);
    return answers.map((item, i) => {
      if (item === questions[index].correct_answer) {
        return (
          <li key={ i }>
            <button value="correct" type="button" data-testid="correct-answer">
              {item}
            </button>
          </li>);
      }
      return (
        <li key={ i }>
          <button
            type="button"
            data-testid={ `wrong-answer-${i}` }
            value="incorrect"
          >
            {item}
          </button>
        </li>
      );
    });
  }

  ArrayRandomAnswers(questions, index) {
    const answers = questions[index].incorrect_answers;
    answers.splice(Math.floor(Math.random() * ((questions.length - 1) - 0)),
      0, questions[index].correct_answer);
    return answers;
  }

  handleQuestions(questions, index) {
    return (
      <>
        <Timer />
        <section>
          <h3 data-testid="question-category">
            {questions[index].category}
          </h3>
          <p data-testid="question-text">
            {questions[index].question}
          </p>
          <div id="answers">
            <ul>
              {this.answerButtons(questions, index)}
            </ul>
          </div>
        </section>
      </>
    );
  }

  render() {
    const { state: { game: { questions, index, infoIsLoaded } } } = this.props;
    return (
      <main>
        <Header />
        {infoIsLoaded && this.handleQuestions(questions, index)}
      </main>
    );
  }
}

Jogo.propTypes = {
  state: PropTypes.objectOf(PropTypes.any).isRequired,

};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, null)(Jogo);
