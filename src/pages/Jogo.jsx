// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getQuestionsThunk } from '../actions';

class Jogo extends Component {
// constructor() {
// super();
// };
// componentDidMount() {
// const { questions } = this.props;
// console.log(questions);
// }

  render() {
    // const { getQuestions } = this.props;
    // getQuestions();
    return (
      <div>
        <h4 data-testid="question-category">category</h4>
        <p data-testid="question-text">pergunta</p>
        <p data-testid="correct-answer">corr</p>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
// getQuestions: (token) => dispatch(getQuestionsThunk(token)),
// });

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

// Jogo.propTypes = {
// getQuestions: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps)(Jogo);
