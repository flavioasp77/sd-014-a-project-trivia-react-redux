import PropTypes from 'prop-types';
import React from 'react';

class NextQstButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        className="p-2 btn border rounded bg-success"
        onClick={ () => onClick() }
        type="button"
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }
}

NextQstButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextQstButton;
