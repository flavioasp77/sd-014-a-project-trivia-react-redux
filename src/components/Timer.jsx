import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 4,
    };
    this.endTimer = this.endTimer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000; // Milisegundos

    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);

    console.log('O itervalo está rodando');
    console.log(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const MAX_SECONDS = 0;

    if (prevState.timer === MAX_SECONDS) {
      this.endTimer();
    }
  }

  componentWillUnmount() {
    console.log('Unmount !');
    clearInterval(this.cronometerInterval);
  }

  endTimer() {
    this.setState({ timer: 0 });
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

export default Timer;
