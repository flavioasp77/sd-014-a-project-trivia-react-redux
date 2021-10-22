import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './questions.css';
import Buttons from './Buttons';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      order: 0,
      atualQuestion: 0,
      click: false,
    };
    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.shuffleButtons = this.shuffleButtons.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.timeOut = this.timeOut.bind(this);
  }

  componentDidMount() {
    this.shuffleButtons();
  }

  timeOut() {
    const THIRTY_SECONDS = 30000;
    setTimeout(this.setState({ click: true }), THIRTY_SECONDS);
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
    });
  }

  handleClickAnswer() {
    this.setState({ click: true });
  }

  render() {
    const { questionResults, isFetching } = this.props;
    const { atualQuestion, order, click } = this.state;
    if (isFetching) return <p>Loading</p>;
    return (
      <div>
        <section>
          <h3 data-testid="question-category">
            {
              questionResults.response[atualQuestion].category
            }
          </h3>
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
        />
      </div>
    );
  }
}

Questions.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  questionResults: PropTypes.shape({
    response: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questionResults: state.questions.response,
  isFetching: state.questions.isFetching,
});

export default connect(mapStateToProps, null)(Questions);
