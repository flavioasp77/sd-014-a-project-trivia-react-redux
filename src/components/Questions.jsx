/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import fetchApi from '../services/triviaApi';

class Questions extends Component {
  componentDidMount() {
    const { callApi } = this.props;
    callApi();
  }

  render() {
    const { questionResults } = this.props;
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
          Map para os Botões
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callApi: (data) => dispatch(fetchApi(data)),
});

const mapStateToProps = (state) => ({
  questionResults: state.questions.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
