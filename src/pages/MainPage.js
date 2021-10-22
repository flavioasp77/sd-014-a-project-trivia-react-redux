import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class MainPage extends React.Component {
  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <main>
        <Header />
        <Questions questions={ questions } />
      </main>
    );
  }
}

MainPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

export default connect(mapStateToProps, null)(MainPage);
