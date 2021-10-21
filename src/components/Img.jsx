import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Img extends Component {
  render() {
    const {
      id,
      src,
      alt,
      className,
    } = this.props;
    return (
      <img
        src={ src }
        alt={ alt }
        id={ id }
        className={ className }
        data-testid="header-profile-picture"
      />
    );
  }
}

Img.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Img;
