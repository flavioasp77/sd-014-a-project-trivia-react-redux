import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { NUMBER, msgLoss, msgGreat } from '../services/data';

class Feedback extends Component {
  // constructor() {
  //   super();
  //   // this.state = {
  //   //   score,
  //   // };
  // }

  // requisito 13 - para finalizar é preciso
  // que o localStorage retorne o score do player
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const userHash = md5(player.gravatarEmail).toString();

    const asertions = 0;
    // const { asertions } = this.props; // vai depender de onde a informação está vindo
    return (
      <>
        <Header
          player={ player.name }
          score="50"
          src={ `https://www.gravatar.com/avatar/${userHash}` }
        />
        <main>
          <section>
            <h2
              data-testid="feedback-text"
            >
              {
                asertions < NUMBER ? msgLoss : msgGreat
              }
            </h2>
          </section>
        </main>
      </>
    );
  }
}

export default Feedback;
