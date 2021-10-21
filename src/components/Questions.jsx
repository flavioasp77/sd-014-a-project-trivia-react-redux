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
  callApi: (data) => dispatch(fetchApi(data)),
});

export default connect(null, mapDispatchToProps)(Questions);
