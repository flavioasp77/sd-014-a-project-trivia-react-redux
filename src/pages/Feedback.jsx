import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { updateRanking } from '../redux/actions';

class Feedback extends React.Component {
  constructor() {
    super();
    this.messageFeedback = this.messageFeedback.bind(this);
    document.title = 'Trivia-Feedback';
  }

  componentDidMount() {
    const { dispatchUpdateRanking, name, score, pictureURL } = this.props;
    dispatchUpdateRanking({ name, score, pictureURL });
  }

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
        <h2 data-testid="feedback-text">{ this.messageFeedback() }</h2>
        <br />
        <h3>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          {plural}
          !
        </h3>
        <h3>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
          {' '}
          pontos
        </h3>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
            className="big-button"
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

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateRanking: (newPlayer) => dispatch(updateRanking(newPlayer)),
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  pictureURL: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatchUpdateRanking: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
