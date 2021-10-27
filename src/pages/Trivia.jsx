import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { questionsThunk } from '../redux/actions';

import '../style/style.css';

class Trivia extends Component {
  componentDidMount() {
    const { infoQuestion } = this.props;
    infoQuestion();
  }

  // sortArray() {
  //   const { questions, index } = this.state;
  //   const { correct_answer: correct, incorrect_answers: incorrect } = questions[index];
  //   return [...incorrect, correct].sort();
  // }

  // handleClick() {
  //   this.setState({ className: true });
  // }

  // styleSelectedMoreAlternatives() {
  //   const { questions, index, className } = this.state;
  //   return this.sortArray().map((atual, indice) => {
  //     const correctOrWrong = atual === questions[index].correct_answer;
  //     const button = (
  //       <button
  //         type="button"
  //         key={ indice }
  //         data-testid={ correctOrWrong ? 'correct-answer' : `wrong-answer-${indice}` }
  //         className={ className && `button-${correctOrWrong ? 'correct' : 'wrong'}` }
  //         onClick={ this.handleClick }
  //       >
  //         {atual}
  //       </button>
  //     );
  //     console.log(className);
  //     return button;
  //   });
  // }

  // refreshPage() {
  //   window.location.reload();
  // }

  // nextQuestion() {
  //   const { className } = this.state;
  //   if (className) {
  //     const button = (
  //       <button
  //         type="button"
  //         data-testid="btn-next"
  //         onClick={ this.refreshPage }
  //       >
  //         Próxima
  //       </button>
  //     );
  //     return button;
  //   }
  // }

  render() {
    // const { questions, index } = this.state;
    // console.log('Array questions:', questions, index);
    const { history } = this.props;
    return (
      <main>
        <Header />
        <h1>Jogo</h1>
        <Questions history={ history } />
        {/* {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>
            <p data-testid="question-text">{questions[index].question}</p>
            <div>
              {this.styleSelectedMoreAlternatives()}
            </div>
            <div>
              {this.nextQuestion()}
            </div>
          </div>
        )} */}
      </main>
    );
  }
}

Trivia.propTypes = {
  infoQuestion: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  infoQuestion: () => dispatch(questionsThunk()),
});

export default connect(null, mapDispatchToProps)(Trivia);
