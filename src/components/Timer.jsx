import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTimer as updateTimerAction } from '../actions/questionTimerActions';
import { handleUserAnswer as handleUserAnswerAction } from '../actions/gameActions';
import '../styles/timer.css';

class Timer extends Component {
  constructor() {
    super();
    this.state = { interval: false, timer: 30 };
    this.verifyTimer = this.verifyTimer.bind(this);
    this.setStateInterval = this.setStateInterval.bind(this);
    this.verifyRestartAnimation = this.verifyRestartAnimation.bind(this);
  }

  componentDidMount() {
    this.setStateInterval();
  }

  componentDidUpdate() {
    this.verifyRestartAnimation();
  }

  setStateInterval() {
    const { interval } = this.state;
    if (!interval) {
      const ONE_SECOND = 1000;
      this.setState({
        interval: setInterval(() => {
          this.setState((prev) => ({ timer: prev.timer - 1 }), () => this.verifyTimer());
        }, ONE_SECOND) });
    }
  }

  verifyRestartAnimation() {
    const { interval } = this.state;
    const { game: { timerIsOn }, updateTimer } = this.props;
    const DELAY = 10;
    if (timerIsOn && !interval) {
      document.getElementById('left').classList.remove('progress');
      document.getElementById('right').classList.remove('progress');
      document.getElementById('left').classList.add('s');
      document.getElementById('right').classList.add('s');
      setTimeout(() => {
        this.setState({ timer: 30 });
        updateTimer({ timerValue: 30 });
        document.getElementById('left').classList.add('progress');
        document.getElementById('right').classList.add('progress');
      }, DELAY);
      this.setStateInterval();
    }
  }

  verifyTimer() {
    const { game: { timerIsOn }, updateTimer, handleUserAnswer } = this.props;
    const { interval, timer } = this.state;
    if (timer === 0 || !timerIsOn) {
      updateTimer({ timerValue: timer + 1 });
      clearInterval(interval);
      handleUserAnswer();
      return this.setState({ interval: false });
    }
    return updateTimer({ timerValue: timer, timerIsOn: true });
  }

  render() {
    const { questionTimer: { timerValue }, game: { timerIsOn } } = this.props;
    const { interval } = this.state;
    const MID_ANIMATION = 15;
    return (
      <div className="circular">
        <div className="inner" />
        <div className="outer" />
        <div className="numb">
          {timerValue}
        </div>
        <div className="circle">
          <div className="dot">
            <span />
          </div>
          <div className="bar left">
            <div
              id="left"
              className="progress"
              style={ {
                animationPlayState: (
                  (!timerIsOn && timerValue >= MID_ANIMATION) || !interval) && 'paused',
              } }
            />
          </div>
          <div className="bar right">
            <div
              id="right"
              className="progress"
              style={ {
                animationPlayState: (
                  (!timerIsOn && timerValue < MID_ANIMATION) || !interval) && 'paused',
              } }
            />
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
  game: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ questionTimer, game }) => ({
  questionTimer,
  game,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimer: (payload) => dispatch(updateTimerAction(payload)),
  handleUserAnswer: () => dispatch(handleUserAnswerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
