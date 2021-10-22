import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import '../styles/Play.css';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      showAnswer: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.shouldShowAnswer = this.shouldShowAnswer.bind(this);
  }

  nextQuestion() {
    this.setState((prevState) => ({
      answerIndex: prevState.answerIndex + 1,
      showAnswer: false,
    }));
  }

  shouldShowAnswer() {
    this.setState({ showAnswer: true });
  }

  render() {
    const { data } = this.props;
    const { answerIndex, showAnswer } = this.state;

    const { response_code: responseCode, results } = data;

    if (responseCode !== 0) {
      return (
        <div className="container">
          <p className="text-center">Token expirado!</p>
          <Link className="btn-return" to="/">
            VOLTAR
          </Link>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <QuestionCard
          data={ results[answerIndex] }
          nextQuestion={ this.nextQuestion }
          showAnswer={ showAnswer }
          shouldShowAnswer={ this.shouldShowAnswer }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

Play.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Play);
