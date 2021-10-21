import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class RankingPerson extends Component {
  constructor() {
    super();
    this.state = {
      gravatarImage: '',
    };
    this.getGravatarImage = this.getGravatarImage.bind(this);
  }

  componentDidMount() {
    this.getGravatarImage();
  }

  getGravatarImage() {
    const { gravatarEmail } = this.props;
    const person = md5(gravatarEmail).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${person}`;
    this.setState({ gravatarImage });
  }

  render() {
    const { gravatarImage } = this.state;
    const { username, score, index, gravatarEmail } = this.props;
    console.log(gravatarEmail);
    console.log(username);
    console.log(score);
    return (
      <section>
        <img src={ gravatarImage } alt="gravatar" />
        <p data-testid={ `player-name-${index}` }>{username}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </section>
    );
  }
}

RankingPerson.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingPerson;
