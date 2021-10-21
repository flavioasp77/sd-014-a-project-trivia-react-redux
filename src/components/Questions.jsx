import { connect } from 'react-redux';
import React, { Component } from 'react';
import { questionsInfoThunk } from '../actions';

class Questions extends Component {
  componentDidMount() {
    const { questionInfo } = this.props;
    questionInfo();
  }

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
              <p data-testid="question-text">Pergunta</p>
            </section>
            <section>
              Map para os Botões
            </section>
          </div>
        )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionInfo: () => dispatch(questionsInfoThunk()),
});

const mapStateToProps = (state) => ({
  questionResults: state.questions.response,
  isFetching: state.questions.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
