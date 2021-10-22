import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { generateQuestions } from '../redux/actions';
import Questions from '../components/Questions';

class Play extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions } = this.props;

    return (
      <main>
        {
          questions.length && <Questions { ...questions[0] } />
        }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  generateQuestions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(generateQuestions()),
});
Play.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
  })),
};

Play.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
