import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData as fetchDataAction } from '../actions';

class Play extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { data } = this.props;
    const { response_code: code } = data;

    if (code !== 0) return <div>Token expirado!</div>;

    return (
      <div>
        <h1>Play</h1>
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
  data: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
