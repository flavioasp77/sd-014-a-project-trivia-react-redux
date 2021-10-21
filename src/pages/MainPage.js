import React from 'react';
import Header from '../components/Header';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.questRequest = this.questRequest.bind(this);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.questRequest();
  }

  questRequest() {
    const token = localStorage.getItem('token');
    try {
      fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
        .then((request) => request.json())
        .then((data) => this.setState({
          questions: data.results,
        }));
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <main>
        <Header />
        {questions.map((question, index) => (
          <section key={ index }>
            <p data-testid="question-category">{question.category}</p>
            <p data-testid="question-text">{question.question}</p>
            <button
              data-testid="correct-answer"
              type="button"
            >
              {question.correct_answer}

            </button>
            {question.incorrect_answers.map((incorrect, ind) => (
              <button
                data-testid={ `wrong-answer-${ind}` }
                type="button"
                key={ ind }
              >
                {incorrect}
              </button>))}
          </section>))}
      </main>
    );
  }
}

export default MainPage;
