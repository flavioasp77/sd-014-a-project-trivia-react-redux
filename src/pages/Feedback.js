import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      playerAsertions: 0,
      msg: '',
    };

    this.getFeedback = this.getFeedback.bind(this);
  }

  getFeedback() {
    const { asertions } = this.props;
    const NUMBER = 3;
    if (asertions < NUMBER) {
      this.setState({
        msg: 'Podia ser melhor...',
      });
    }
  }

  render() {
    return (
      <>
        <Header
          player={ player.name }
          score={ score }
          src={ `https://www.gravatar.com/avatar/${userHash}` }
        />
        <main>
          <section>
            <h2 data-testid="feedback-text">{ msg }</h2>
          </section>
        </main>
      </>
    );
  }
}

export default Feedback;
