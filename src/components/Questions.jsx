/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Questions extends Component {
  render() {
    const { questionResults, isFetching } = this.props;
    return (
      isFetching ? <p>Loading</p>
        : (
          <div>
            <section>
              <h3 data-testid="question-category">
                {
                  questionResults.response[0].category
                }
              </h3>
              <p data-testid="question-text">
                {
                  questionResults.response[0].question
                }
              </p>
            </section>
            <section>
              <button type="button" data-testid="correct-answer">
                { questionResults.response[0].correct_answer }
              </button>
              {
                questionResults.response[0].incorrect_answers.map((question, index) => (
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
          </div>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  questionResults: state.questions.response,
  isFetching: state.questions.isFetching,
});

export default connect(mapStateToProps, null)(Questions);
