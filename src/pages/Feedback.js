import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { NUMBER } from '../services/data';
import Header from '../components/Header';
import Button from '../components/Button';
import '../css/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      questions: 0,
    };
  }

  // requisito 13 - para finalizar é preciso
  // que o localStorage retorne o score do player
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score, questions } = this.state;
    const userHash = md5(player.gravatarEmail).toString();
    const assertions = 0;

    const messages = {
      question: `Você acertou ${questions} questões`,
      score: `Um total de ${score} pontos`,
      loss: 'Podia ser melhor...',
      great: 'Mandou bem!',
    };
    // const { assertions } = this.props; // vai depender de onde a informação está vindo

    return (
      <>
        <Header
          player={ player.name }
          score={ score }
          src={ `https://www.gravatar.com/avatar/${userHash}` }
        />
        <main className="feedback__container">
          <section>
            <h2 data-testid="feedback-text">
              { assertions < NUMBER ? messages.loss : messages.great }
            </h2>

            <div>
              <span data-testid="feedback-total-question">{ messages.question }</span>
              <span data-testid="feedback-total-score">{ messages.score }</span>
            </div>

            <Link to="/ranking">
              <Button value="Ver Ranking" dataTestId="btn-ranking" />
            </Link>

            <Link to="/">
              <Button
                value="Jogar Novamente"
                className="btn-play-again"
                dataTestId="btn-play-again"
              />
            </Link>
          </section>
        </main>
      </>
    );
  }
}

export default Feedback;
