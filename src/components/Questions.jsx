import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      atualQuestion: 0,
    };
    this.handleNextBtn = this.handleNextBtn.bind(this);
  }

  handleNextBtn() {
    const { atualQuestion } = this.state;

    this.setState({
      atualQuestion: atualQuestion + 1,
    });
  }

  render() {
    const { questionResults, isFetching } = this.props;
    const { atualQuestion } = this.state;
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
        <section>
          <button type="button" data-testid="correct-answer">
            { questionResults.response[atualQuestion].correct_answer }
          </button>
          {
            questionResults
              .response[atualQuestion].incorrect_answers.map((question, index) => (
                <button
                  key={ index }
                  type="button"
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
