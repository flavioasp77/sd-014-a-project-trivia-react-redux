import React, { Component } from 'react';

export class TimeOut extends Component {
  constructor() {
    super();

    this.setTime = this.setTime.bind(this);

    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.setTime();
  }

  setTime() {
    const ONE_SECOND = 1000;
    setTimeout(this.setTime, ONE_SECOND);
    const { time } = this.state;
    const newTime = time - 1;
    if (time === 0) return time;
    this.setState({ time: newTime });
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        { time }
      </div>
    );
  }
}

export default TimeOut;
