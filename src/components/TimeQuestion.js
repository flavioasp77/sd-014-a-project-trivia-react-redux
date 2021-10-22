// import React from 'react';

// class TimeQuestion extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       timer: 30,
//     };
//     this.resetTimer = this.resetTimer.bind(this);
//     this.setIntervalFunction = this.setIntervalFunction.bind(this);
//   }

//   componentDidMount() {
//     const TIMEOUT = 5000;
//     setTimeout(() => {
//       this.setIntervalFunction();
//     }, TIMEOUT);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const MIN_SECONDS = 0;
//     if (prevState.timer === MIN_SECONDS) {
//       this.resetTimer();
//     }
//   }

//   setIntervalFunction() {
//     const TIME_INTERVAL = 1000;

//     setInterval(() => {
//       this.setState((prevState) => ({ timer: prevState.timer - 1 }));
//     }, TIME_INTERVAL);
//   }

//   resetTimer() {
//     this.setState({ timer: 0 });
//   }

//   render() {
//     const { timer } = this.state;
//     return (
//       <h3>{`Timer: ${timer}`}</h3>
//     );
//   }
// }

// export default TimeQuestion;
