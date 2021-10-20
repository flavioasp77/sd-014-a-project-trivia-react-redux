import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import Question from '../Components/Question';

import { fetchTriviaQuestions } from '../helper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.setGame();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  setGame = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const questions = await fetchTriviaQuestions(token);
    this.setState({ questions });
  }

  handleChoice = () => {

  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    if (questions.length === 0) return <p>teste</p>
    return (
      <main>
        <Header />
        <Question
          question={ questions[0] }
          handleChoice={ this.handleChoice }
        />
      </main>
    );
  }
}

export default connect(null, null)(Game);
