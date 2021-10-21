import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  render() {
    const { secondsTimer } = this.props;
    return (
      <div>
        <p>
          Tempo:
          {' '}
          <span>{secondsTimer}</span>
        </p>
      </div>
    );
  }
}

Timer.propTypes = {
  secondsTimer: PropTypes.number.isRequired,
};
