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
        <div>{questions.map((question) => <p>{question.category}</p>)}</div>
      </main>
    );
  }
}

export default MainPage;
