import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { disableButton } from '../redux/actions';

class CountdownTimer extends Component {
  constructor() {
    super();
    this.state = { time: 30 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(this.countDown, ONE_SECOND);
  }

  countDown() {
    const { time } = this.state;
    const { setDisableButton } = this.props;
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }));
    if (time === 0) { setDisableButton(); }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <section>
          { time > 0 ? `${time} segundos` : 'Seu tempo acabou!' }
        </section>
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  setDisableButton: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setDisableButton: () => dispatch(disableButton()),
});

export default connect(null, mapDispatchToProps)(CountdownTimer);
