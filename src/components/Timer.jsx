import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsTimer: 30,
    };
    this.decrementTimer = this.decrementTimer.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  decrementTimer() {
    this.setState((previous) => ({
      secondsTimer: previous.secondsTimer - 1,
    }));
  }

  timer() {
    const ONE_SECOND = 1000;
    const timerInterval = setInterval(() => {
      const { secondsTimer } = this.state; // garante o state atualizado
      this.decrementTimer();
      if (secondsTimer === 1) {
        clearInterval(timerInterval);
        // faz que a resposta seja incorreta
      }
    },
    ONE_SECOND);
    return timerInterval;
  }

  render() {
    const { secondsTimer } = this.state;
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

};
