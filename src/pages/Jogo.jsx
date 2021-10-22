import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestionsThunk } from '../actions';

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      currQuestion: 0,
      clicked: false,
    };
    this.pegarPerguntas = this.pegarPerguntas.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.concatQuestions = this.concatQuestions.bind(this);
    this.setClass = this.setClass.bind(this);
  }

  componentDidMount() {
    this.pegarPerguntas();
  }

  setClass() {
    this.setState({ clicked: true });
  }

  async pegarPerguntas() {
    const { getQuestions } = this.props;
    await getQuestions();
    this.setState({ isLoading: false });
  }

  changeQuestion() {
    this.setState((prevState) => ({
      currQuestion: prevState.currQuestion + 1,
      clicked: false,
    }
    ));
  }

  concatQuestions(correct, incorrect) {
    const arr1 = [...incorrect, correct];
    return arr1.sort();
  }

  button() {
    return (
      <button
        type="button"
        onClick={ this.changeQuestion }
        data-testid="btn-next"
      >
        Proxima
      </button>
    );
  }

  perguntas() {
    const { questions } = this.props;
    const { currQuestion, clicked } = this.state;
    const options = this.concatQuestions(questions[currQuestion].correct_answer,
      questions[currQuestion].incorrect_answers);
    return (
      <div>
        <h4 data-testid="question-category">{questions[currQuestion].category}</h4>
        <p data-testid="question-text">{questions[currQuestion].question}</p>
        {options.map((questao, index) => (
          questao === questions[currQuestion].correct_answer ? (
            <button
              className={ clicked ? 'green-border' : '' }
              onClick={ this.setClass }
              type="button"
              key={ index }
              data-testid="correct-answer"
            >
              {questao}
            </button>
          ) : (
            <button
              className={ clicked ? 'red-border' : '' }
              onClick={ this.setClass }
              type="button"
              key={ index }
              data-testid={ `wrong-answers-${index}` }
            >
              {questao}
            </button>
          )
        ))}
        {clicked && this.button()}
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <Header />
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

Jogo.propTypes = {
  getQuestions: PropTypes.func,
  questions: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
