import React, { Component } from 'react';
import Header from '../components/Header';
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
    this.randomArray = this.randomArray.bind(this);
  }

  componentDidMount() {
    this.pegarPerguntas();
  }

  randomArray(array, questaocerta) {
    const ar1 = [...array, questaocerta];
    const ar2 = ar1.sort();
    console.log(ar1);
    console.log(ar2);
  }

  async pegarPerguntas() {
    const { getQuestions } = this.props;
    await getQuestions();
    this.setState({ isLoading: false });
  }

  perguntas() {
    const { questions } = this.props;
    return (
      <div>
        <h4 data-testid="question-category">{questions[0].category}</h4>
        <p data-testid="question-text">{questions[0].question}</p>
        <p data-testid="correct-answer">{questions[0].correct_answer}</p>
        {questions[0].incorrect_answers.map((questao, index) => (
          <p data-testid={ `wrong-answer-${index}` } key={ index }>{questao}</p>
        ))}
        <p>{questions[0].correct_answer}</p>
      </div>
    )
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

// Jogo.propTypes = {
// getQuestions: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
