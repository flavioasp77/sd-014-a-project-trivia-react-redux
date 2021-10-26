import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const MEDIA_ACERTOS = 3;
    const perguntasCertas = 5;
    const score = 4;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          { perguntasCertas >= MEDIA_ACERTOS ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h2>
        <h3 data-testid="feedback-total-score">
          {`Você fez ${score} pontos`}
        </h3>
        <h3 data-testid="feedback-total-question">
          {perguntasCertas <= 0
            ? 'Não acertou nenhuma pergunta' : `Acertou ${perguntasCertas} perguntas` }
        </h3>
        <button
          onClick={ this.handleClick }
          data-testid="btn-play-again"
          type="submit"
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FeedBack;
