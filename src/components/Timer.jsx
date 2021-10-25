import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTime as getTimeAction, resetTimer as resetTimerAction } from '../actions';

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
    const { resetTimer } = this.props;
    this.setTime();
    resetTimer(this.setTime);
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
    const { isClicked, updateBtn, getTime, reset } = this.props;
    if (isClicked || timer === 0) {
      clearInterval(this.cronometer);
      getTime(timer);
      if (!updated && !isClicked) {
        updateBtn();
        this.setState({
          updated: true,
        });
      }
    }
    if (reset) {
      this.setState({
        timer: 30,
      });
      getTime(0);
      this.setTime();
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
  reset: PropTypes.bool.isRequired,
  resetTimer: PropTypes.func.isRequired,
  updateBtn: PropTypes.func.isRequired,
  getTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTime: (timer) => dispatch(getTimeAction(timer)),
  resetTimer: (func) => dispatch(resetTimerAction(func)),
});

export default connect(null, mapDispatchToProps)(Timer);
