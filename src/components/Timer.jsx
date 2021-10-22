import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      updated: false,
    };

    this.setTime = this.setTime.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.setTime();
  }

  componentDidUpdate() {
    this.timer();
  }

  setTime() {
    const ONE_SECOND = 1000;
    this.cronometer = setInterval(() => this.setState(
      (prevState) => ({ timer: prevState.timer - 1 }),
    ), ONE_SECOND);
  }

  timer() {
    const { timer, updated } = this.state;
    const { isClicked, updateBtn } = this.props;
    if (isClicked || timer === 0) {
      clearInterval(this.cronometer);
      if (!updated) {
        updateBtn();
        this.setState({
          updated: true,
        });
      }
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div>{ timer }</div>
    );
  }
}

Timer.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  updateBtn: PropTypes.func.isRequired,
};

export default Timer;
