import React, { Component } from 'react';
import { Header } from '../components/Header';
import TriviaQuestion from '../components/TriviaQuestion';
import { useToken } from '../services/APIrequests';
import shuffleArray from '../services/functions';
import { getLocalToken } from '../services/localStorage';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      alternativesShuffled: [],
    };
    this.saveQuestions = this.saveQuestions.bind(this);
    this.scrambleAlternatives = this.scrambleAlternatives.bind(this);
  }

  componentDidMount() {
    this.saveQuestions();
  }

  // {
  //   "category": "Geography",
  //   "type": "multiple",
  //   "difficulty": "medium",
  //   "question": "What is the largest non-continental island in the world?",
  //   "correct_answer": "Greenland",
  //   "incorrect_answers": [
  //   "New Guinea",
  //   "Borneo",
  //   "Madagascar"
  //   ]
  //   },

  async saveQuestions() {
    const token = getLocalToken();
    const questions = await useToken(token);
    await this.setState({
      questions: questions.results,
    });
    this.scrambleAlternatives();
  }

  scrambleAlternatives() {
    const { questions } = this.state;
    const alternatives = [questions[0].correct_answer, ...questions[0].incorrect_answers];
    const alternativesShuffled = shuffleArray(alternatives);
    this.setState({ alternativesShuffled });
  }

  render() {
    const { questions, alternativesShuffled } = this.state;
    return (
      <div>
        <Header />
        <TriviaQuestion
          question={ questions[0] }
          scrambledQuestions={ alternativesShuffled }
        />
      </div>
    );
  }
}

export default GameScreen;
