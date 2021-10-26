import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timerAction } from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.intervalTimer();
  }

  intervalTimer() {
    const SECOND = 1000;
    const idInterval = setInterval(() => {
      const { seconds } = this.state;
      this.setState({ seconds: seconds - 1 });
      sessionStorage.setItem('timer', seconds - 1);
    }, SECOND);
    sessionStorage.setItem('idInterval', idInterval);
  }

  iconTimer(seconds) {
    if (seconds % 2 === 1) {
      return <i className="fas fa-hourglass-start" />;
    } if (seconds === 0) {
      return <i className="fas fa-hourglass-end" />;
    }
    return <i className="fas fa-hourglass-half" />;
  }

  render() {
    const { answered, callback } = this.props;
    const { seconds } = this.state;
    if (seconds < 1 || answered) {
      clearInterval(sessionStorage.getItem('idInterval'));
      const { decrementTime } = this.props;
      decrementTime(seconds);
      callback();
    }
    return (
      <div className="text-danger">
        { this.iconTimer(seconds) }
        {' '}
        Tempo
        {' '}
        { seconds }
      </div>
    );
  }
}

Timer.propTypes = {
  answered: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  decrementTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  decrementTime: (time) => dispatch(timerAction(time)),
});

const mapStateToProps = ({ timer }) => ({
  timer: timer.time,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
