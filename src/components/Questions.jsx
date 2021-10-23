import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { setTimer } from '../actions';
import './questions.css';
import Buttons from './Buttons';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      order: 0,
      atualQuestion: 0,
      click: false,
      timer: 30,
    };
    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.shuffleButtons = this.shuffleButtons.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.shuffleButtons();
    this.timeOut = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { setTimerAction } = this.props;
    if (timer === 0) {
      clearInterval(this.timeOut);
      setTimerAction(timer);
    }
  }

  shuffleButtons() {
    const ANSWERS_NUMBER = 4;
    const randomButton = Math.floor(Math.random() * ANSWERS_NUMBER);
    this.setState({
      order: randomButton,
    });
  }

  handleNextBtn() {
    const { atualQuestion } = this.state;

    this.setState({
      atualQuestion: atualQuestion + 1,
      click: false,
      timer: 30,
    });
    // Ativa o timer nas outras perguntas
    const ONE_SECOND = 1000;
    this.timeOut = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  handleClickAnswer() {
    const { setTimerAction } = this.props;
    const { timer } = this.state;
    this.setState({ click: true });
    clearInterval(this.timeOut);
    setTimerAction(timer);
  }

  render() {
    const { questionResults, isFetching } = this.props;
    const { atualQuestion, order, click, timer } = this.state;
    if (isFetching) return <p>Loading</p>;
    return (
      <div>
        <section>
          <h3 data-testid="question-category">
            {
              questionResults.response[atualQuestion].category
            }
          </h3>
          <p>{ timer }</p>
          <p data-testid="question-text">
            {
              questionResults.response[atualQuestion].question
            }
          </p>
        </section>
        <Buttons
          order={ order }
          handleClickAnswer={ this.handleClickAnswer }
          click={ click }
          atualQuestion={ atualQuestion }
          questionResults={ questionResults }
          handleNextBtn={ this.handleNextBtn }
          timer={ timer }
        />
      </div>
    );
  }
}

Questions.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  questionResults: PropTypes.shape({
    response: PropTypes.arrayOf().isRequired }).isRequired,
  setTimerAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setTimerAction: (timer) => (dispatch(setTimer(timer))),
});

const mapStateToProps = (state) => ({
  questionResults: state.questions.response,
  isFetching: state.questions.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
