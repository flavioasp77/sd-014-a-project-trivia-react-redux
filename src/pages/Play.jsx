import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData as fetchDataAction } from '../actions';
import Question from '../components/Question';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData().then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { data } = this.props;
    const { isLoading } = this.state;
    const { response_code: code, results } = data;

    if (isLoading) return <div>Loading...</div>;

    if (code !== 0) return <div>Token expirado!</div>;

    return (
      <div>
        <h1>Play</h1>
        <Question data={ results[0] } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchDataAction()),
});

Play.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
