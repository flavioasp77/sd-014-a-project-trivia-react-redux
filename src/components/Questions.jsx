/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import fetchApi from '../services/triviaApi';
// import Buttons from './Buttons';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const { callApi } = this.props;
    callApi();
    this.updateState();
  }

  updateState() {
    const { questionResults } = this.props;
    this.setState({
      questions: questionResults,
    });
  }

  render() {
    const { questionResults } = this.props;
    console.log(questionResults && questionResults[0]);
    return (
      <div>
        <section>
          <h3 data-testid="question-category">
            {

            }
          </h3>
          <p data-testid="question-text">Pergunta</p>
        </section>
        <section>
          {/* <Buttons questions={ questionResults } /> */}
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callApi: (data) => dispatch(fetchApi(data)),
});

const mapStateToProps = (state) => ({
  questionResults: state.questions.questions.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
