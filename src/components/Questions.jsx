import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      order: 0,
      atualQuestion: 0,
    };
    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.shuffleButtons = this.shuffleButtons.bind(this);
  }

  componentDidMount() {
    this.shuffleButtons();
  }

  shuffleButtons() {
    const ANSWERS_NUMBER = 4;
    const randomButton = Math.floor(Math.random() * ANSWERS_NUMBER);
    this.setState({
      order: randomButton,
    });
  }

  handleNextBtn() {
    const { atualQuestion } = this.state;

    this.setState({
      atualQuestion: atualQuestion + 1,
    });
  }

  render() {
    const { questionResults, isFetching } = this.props;
    const { atualQuestion, order } = this.state;
    if (isFetching) return <p>Loading</p>;
    return (
      <div>
        <section>
          <h3 data-testid="question-category">
            {
              questionResults.response[atualQuestion].category
            }
          </h3>
          <p data-testid="question-text">
            {
              questionResults.response[atualQuestion].question
            }
          </p>
        </section>
        <section className="section-answers">
          <button
            type="button"
            data-testid="correct-answer"
            style={ { order } }
          >
            { questionResults.response[atualQuestion].correct_answer }
          </button>
          {
            questionResults
              .response[atualQuestion].incorrect_answers.map((question, index) => (
                <button
                  key={ index }
                  type="button"
                  style={ { order: index } }
                  data-testid={ `wrong-answer-${index}` }
                >
                  {question}
                </button>
              ))
          }
        </section>
        <button type="button" onClick={ this.handleNextBtn }>Continue</button>
      </div>
    );
  }
}

Questions.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  questionResults: PropTypes.shape({
    response: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questionResults: state.questions.response,
  isFetching: state.questions.isFetching,
});

export default connect(mapStateToProps, null)(Questions);
