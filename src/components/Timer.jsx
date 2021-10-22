import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      // referência livre lecture 13.1
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000; // Milisegundos
    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const MIN_SECONDS = 0;
    if (prevState.seconds === MIN_SECONDS) {
      this.resetSeconds();
    }
  }

  componentWillUnmount() {
    console.log('Unmount !');
    clearInterval(this.cronometerInterval);
  }

  resetSeconds = () => {
    this.setState({ seconds: 0 });
  }

  render() {
    const { seconds } = this.state;
    return (
      <p>
        { seconds }
      </p>
    );
  }
}

export default Timer;
