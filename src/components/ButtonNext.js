import React from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <button type="button" onClick={ onClick } data-testid="btn-next">
        Próxima
      </button>
    );
  }
}

ButtonNext.propTypes = {
  buttonNext: PropTypes.func,
}.isRequired;

export default ButtonNext;
