import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { NUMBER } from '../services/data';
import Header from '../components/Header';
import Button from '../components/Button';
import '../css/Feedback.css';

class Feedback extends Component {
  // requisito 13 - para finalizar é preciso
  // que o localStorage retorne o score do player
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = player;
    const userHash = md5(player.gravatarEmail).toString();

    const messages = {
      question: `Você acertou ${assertions} questões`,
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
              <span>Você acertou</span>
              <span data-testid="feedback-total-question">{ assertions }</span>
              <span>questões.</span>
              <span>Um total de</span>
              <span data-testid="feedback-total-score">{ score }</span>
              <span>pontos.</span>
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
