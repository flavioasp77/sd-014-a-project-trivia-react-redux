import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
      stopped: false,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { timer, stopped } = this.state;
    const { selectedAnswer } = this.props;
    if (!selectedAnswer || (timer !== 0) || !stopped) {
      this.timer();
    }
  }

  timer() {
    const { selectedAnswer } = this.props;
    const ONE_SECOND = 1000;
    const cd = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0 && !selectedAnswer) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      } else {
        this.setState({ stopped: true });
        selectedAnswer(true);
        clearInterval(cd);
      }
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.state;
    return (
      <p>
        { timer }
      </p>
    );
  }
}

StopWatch.propTypes = {
  selectedAnswer: PropTypes.bool.isRequired,
};
