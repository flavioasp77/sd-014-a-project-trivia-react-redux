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
    const { generateQuestions } = this.props;
    console.log(generateQuestions);
    return (
      <main>
        <Header />
        <Questions pergunta={ generateQuestions[currentQuestion] } />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  generateQuestions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

Play.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  generateQuestions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
