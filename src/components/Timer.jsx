import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTimer as updateTimerAction } from '../actions/questionTimerActions';
import { handleUserAnswer as handleUserAnswerAction } from '../actions/gameActions';
import '../styles/timer.css';

class Timer extends Component {
  constructor() {
    super();
    this.state = { interval: null, timer: 30 };
    this.verifyTimer = this.verifyTimer.bind(this);
    this.setStateInterval = this.setStateInterval.bind(this);
  }

  componentDidMount() {
    this.setStateInterval();
  }

  setStateInterval() {
    const ONE_SECOND = 1000;
    this.setState({ interval: setInterval(() => {
      this.setState((prev) => ({ timer: prev.timer - 1 }), () => this.verifyTimer());
    }, ONE_SECOND) });
  }

  verifyTimer() {
    const { questionTimer: { timerIsOn }, updateTimer, handleUserAnswer } = this.props;
    const { interval, timer } = this.state;
    if (timer === 0 || !timerIsOn) {
      updateTimer({ timerValue: timer, timerIsOn: false });
      handleUserAnswer();
      return clearInterval(interval);
    }
    return updateTimer({ timerValue: timer, timerIsOn: true });
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="circular">
        <div className="inner" />
        <div className="outer" />
        <div className="numb">
          {timer}
        </div>
        <div className="circle">
          <div className="dot">
            <span />
          </div>
          <div className="bar left">
            <div className="progress" />
          </div>
          <div className="bar right">
            <div className="progress" />
          </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  questionTimer: PropTypes.objectOf(PropTypes.any).isRequired,
  updateTimer: PropTypes.func.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = ({ questionTimer }) => ({
  questionTimer,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimer: (payload) => dispatch(updateTimerAction(payload)),
  handleUserAnswer: () => dispatch(handleUserAnswerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
