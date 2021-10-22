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
    const { seconds } = this.state;
    const ONE_SECOND = 1000;
    while (seconds >= 0) {
      this.cronometerInterval = setInterval(() => {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      }, ONE_SECOND);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const MAX_SECONDS = 30;
    if (prevState.seconds === MAX_SECONDS) {
      this.resetSeconds();
    }
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
