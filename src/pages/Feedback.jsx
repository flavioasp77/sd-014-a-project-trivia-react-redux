import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    // this.cloneLocalStorageToState = this.cloneLocalStorageToState.bind(this);
    this.messageFeedback = this.messageFeedback.bind(this);
    this.handleRanking = this.handleRanking.bind(this);

    document.title = 'Trivia-Feedback';
  }

  // componentDidMount() {
  //   this.cloneLocalStorageToState();
  // }

  handleRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { name, score, pictureURL } = this.props;
    const newRanking = [...ranking || [], { name, score, picture: pictureURL }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  // cloneLocalStorageToState() {
  //   const playerInfo = JSON.parse(localStorage.getItem('state'));
  //   const { player: { name, score, gravatarEmail, assertions } } = playerInfo;
  //   this.setState({
  //     name,
  //     score,
  //     pictureURL: getGravatar(gravatarEmail),
  //     assertions,
  //   }, () => {
  //     this.handleRanking();
  //   });
  // }

  messageFeedback() {
    const { assertions } = this.props;
    const NUMBER_OF_HITS = 3;
    return (assertions < NUMBER_OF_HITS) ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { name, score, pictureURL, assertions } = this.props;
    const plural = assertions === 1 ? 'questão' : 'questões';
    return (
      <>
        <Header name={ name } score={ score } pictureURL={ pictureURL } />
        <p data-testid="feedback-text">{ this.messageFeedback() }</p>
        <h1 data-testid="feedback-text">{ this.messageFeedback() }</h1>
        <br />
        <h2>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          {plural}
          !
        </h2>
        <h2>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
          {' '}
          pontos
        </h2>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  pictureURL: state.player.pictureURL,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  pictureURL: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
