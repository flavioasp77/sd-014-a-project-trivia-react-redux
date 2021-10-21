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

  async questRequest() {
    const token = await localStorage.getItem('token');
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
          <div key={ index }>
            <p>
              Category:
              <span data-testid="question-category">{question.category}</span>
            </p>
            <p>
              Question:
              <span data-testid="question-text">{question.question}</span>
            </p>
            <ul>
              <li>
                <button
                  data-testid="correct-answer"
                  type="button"
                >
                  { question.correct_answer }
                </button>
              </li>
              {question.incorrect_answers.map((incorrect, ind) => (
                <li key={ ind }>

                  <button
                    data-testid={ `wrong-answer-${ind}` }
                    type="button"
                  >
                    {incorrect}
                  </button>
                </li>))}
            </ul>
          </div>))}
      </main>
    );
  }
}

export default MainPage;
