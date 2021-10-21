// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestionsThunk } from '../actions';

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
    this.pegarPerguntas = this.pegarPerguntas.bind(this);
  }

  componentDidMount() {
    this.pegarPerguntas();
  }

  async pegarPerguntas() {
    const { getQuestions } = this.props;
    await getQuestions();
    this.setState({ isLoading: false });
  }

  perguntas() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <h4 data-testid="question-category">{questions[0].category}</h4>
        <p data-testid="question-text">{questions[0].question}</p>
        <p data-testid="correct-answer">{questions[0].correct_answer}</p>
      </div>
    )
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? null : this.perguntas()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
getQuestions: (token) => dispatch(getQuestionsThunk(token)),
});

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

// Jogo.propTypes = {
// getQuestions: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
