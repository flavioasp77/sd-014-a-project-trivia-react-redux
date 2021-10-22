import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  componentDidMount() {
    const { setTimer } = this.props;
    setTimer();
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        <span>{`Tempo Restante:${time}`}</span>
      </div>
    );
  }
}

Timer.propTypes = {
  setTimer: PropTypes.func.isRequired,
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};
