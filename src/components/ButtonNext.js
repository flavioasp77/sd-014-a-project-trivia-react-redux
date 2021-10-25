import React from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends React.Component {
  render() {
    const { buttonNext } = this.props;
    return (
      <button type="button" onClick={ buttonNext } data-testid="btn-next">
        Próxima
      </button>
    );
  }
}

ButtonNext.propTypes = {
  buttonNext: PropTypes.func,
}.isRequired;

export default ButtonNext;
