import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { getQuestions } from '../services/requests';
import '../css/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    getQuestions();
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const userHash = md5(player.gravatarEmail).toString();
    return (
      <>
        <Header player={ player.name } score="0" src={ `https://www.gravatar.com/avatar/${userHash}` } />
        <main className="game__container">
          <div>
            <h4 data-testid="question-category">categoria</h4>
            <p data-testid="question-text">pergunta</p>
          </div>
        </main>
      </>
    );
  }
}

export default Game;

// * A pergunta e suas alternativas de resposta devem ser recebidas da API do Trivia

//   * O texto com as alternativas devem ser exibidos seguindo as regras abaixo:
//     * O elemento com a alternativa correta deve possuir o atributo `data-testid` com o valor `correct-answer`
//     * Os elementos com as alternativas incorretas devem possuir o atributo `data-testid` com o valor `wrong-answer-${index}`, com `${index}` iniciando com o valor `0`
//     * As alternativas devem ser exibidas em ordem aleatória
//     * Dica: utilize botões (`<button/>`) para as alternativas
