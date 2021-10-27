import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Questions from '../components/Questions';
import { fetchQuestions } from '../redux/actions';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  handleClick() {
    const { currentQuestion } = this.state;
    const { generateQuestions } = this.props;
    if (currentQuestion < generateQuestions.length - 1) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
      }));
    }
  }

  render() {
    const { currentQuestion } = this.state;
    const { generateQuestions, isFetching, score } = this.props;
    return (
      <main>
        <Header score={ score } />
        {
          isFetching
            ? <p>Loading</p> : <Questions { ...generateQuestions[currentQuestion] } />
        }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  generateQuestions: state.generateQuestions.questions,
  isFetching: state.generateQuestions.isFetching,
  score: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

Play.propTypes = {
  generateQuestions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  getQuestions: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
