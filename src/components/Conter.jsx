import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Conter extends Component {
  constructor() {
    super();
    this.state = {
      second: 30,
    };

    this.intervalOneSecond = this.intervalOneSecond.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.intervalOneSecond();
  }

  componentDidUpdate(prevProps, prevState) {
    const MIN = 0;
    const { solution, isTimerZero } = this.props;
    if (prevState.second === MIN) {
      this.resetTimer();
      solution();
      this.stopTimer();
      isTimerZero();
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.cronometerInterval);
  // }

  // Funcoes:
  intervalOneSecond() {
    const SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({ second: prevState.second - 1 }));
    }, SECOND);
  }

  resetTimer() {
    this.setState({ second: 30 });
  }

  stopTimer() {
    this.setState({ second: 0 });
  }

  render() {
    const { second } = this.state;
    return (
      <div>{ `${second} seg` }</div>
    );
  }
}

Conter.propTypes = {
  isTimerZero: PropTypes.func.isRequired,
  solution: PropTypes.func.isRequired,
};

export default Conter;
