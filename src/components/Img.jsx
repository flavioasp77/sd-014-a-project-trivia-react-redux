import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Img extends Component {
  render() {
    const { src, alt, dataTestId } = this.props;

    return (
      <img src={ src } alt={ alt } data-testid={ dataTestId } />
    );
  }
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
};

Img.defaultProps = {
  dataTestId: '',
};

export default Img;
