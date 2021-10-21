/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { questionsInfoThunk as getQuestionInfo } from '../actions/index';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  componentDidMount() {
    const { questionsDispatchAction } = this.props;
    questionsDispatchAction();
  }

  render() {
    return (
      <div>
        <section>
          <h3 data-testid="question-category">Categoria</h3>
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
  questionsDispatchAction: () => (
    dispatch(getQuestionInfo())
  ),
});

export default connect(null, mapDispatchToProps)(Questions);
