import React from 'react';
import Countdown from 'react-countdown';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      allQst: [],
      answered: false,
      id: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.questionAnswered = this.questionAnswered.bind(this);
    this.questionAnsweredClassName = this.questionAnsweredClassName.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fetchQuestions.json();
    const { results } = json;
    this.setState({ allQst: results });
  }

  shuffleQuestions(array) {
    // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length;
    let randomIndex = 0;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  questionAnswered() {
    this.setState({
      answered: true,
    });
  }

  questionAnsweredClassName(className) {
    const { answered } = this.state;
    return answered ? className : '';
  }

  questionCompleted() {
    const { answered } = this.state;
    return answered;
  }

  nextQuestion() {
    const { id } = this.state;
    this.setState({
      id: id + 1,
    });
  }

  render() {
    const { allQst, id } = this.state;
    if (allQst.length === 0) return <p>Loading...</p>;
    const waiting = 30000;
    console.log(allQst);
    const allAnswers = [...allQst[id].incorrect_answers, allQst[id].correct_answer];
    this.shuffleQuestions(allAnswers);
    console.log(allAnswers);

    return (
      <div>
        <div>
          <p>
            Category:
            <span data-testid="question-category">{ allQst[id].category }</span>
          </p>
          <p>
            Question:
            <span data-testid="question-text">{ allQst[id].question }</span>
          </p>
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.questionAnswered }
            className={ this.questionAnsweredClassName('correct') }
            disabled={ this.questionCompleted() }
          >
            { allQst[id].correct_answer }
          </button>
          { allQst[id].incorrect_answers.map((incorrect, i) => (
            <div key={ i }>
              <button
                type="button"
                data-testid={ `wrong-answer-${i}` }
                onClick={ this.questionAnswered }
                className={ this.questionAnsweredClassName('incorrect') }
                disabled={ this.questionCompleted() }
              >
                { incorrect }
              </button>
            </div>
          ))}
          <Countdown date={ Date.now() + waiting } onComplete={ this.questionAnswered } />
        </div>
        <button type="button" onClick={ this.nextQuestion }>Pŕoxima Questão</button>
      </div>
    );
  }
}
export default Questions;
